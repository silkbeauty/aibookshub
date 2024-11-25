import streamlit as st
import pandas, numpy, requests
import dotenv, re
from PIL.ImageOps import cover

CFG = dotenv.dotenv_values(".env")

from .db_base import DBase

class DSummary(DBase):

    def fetch_book_details(self, title):
        default_details = {
            "title": title,
            "authors": ["Anonymous"],
            "isbn": "New",
            "summary": "New",
            "language": "en",
            "cover_image": "/images/new.jpg"
        }

        api_url = "https://www.googleapis.com/books/v1/volumes"
        params = {"q": title}
        response = requests.get(api_url, params=params)

        if response.status_code == 200:
            data = response.json()
            st.write(data)
            if "items" in data:
                book = data["items"][0]["volumeInfo"]
                details = {
                    "title": book.get("title","TITLE missing"),
                    "authors": book.get("authors", ["Anonymous"]),
                    "isbn": next(
                        (id["identifier"] for id in book.get("industryIdentifiers", []) if id["type"] == "ISBN_13"),"ISBN"),
                    "summary": book.get("description","Summary")[:250],
                    "language": book.get("language", "Unknown"),
                    "cover_image": book.get("imageLinks", {}).get("thumbnail","/images/new.jpg")
                }
                return details
        return default_details

    def get_summary(self, summary='pending'):

        try:
            # query = (f"SELECT * FROM books WHERE summary='pending';")
            query = (f"SELECT * FROM books;")

            self.cursor.execute(query, )
            records = self.cursor.fetchall()
            st.text(records)

            for record in records:
                record_id = record[0]
                description = record[2]

                b = self.fetch_book_details(description)

                summary = b.get("summary", "Summary")
                isbn = b.get("isbn","isbn")
                title_google = b.get("title","title is missing")
                cover_image = b.get("cover_image","/images/new.jpg")
                get_authors = b.get("authors", ["Anonymous"])
                language = b.get("language", "un")
                authors = ", ".join(get_authors).strip('{}').replace('","', ', ').replace('"', '')

                update_query = f"""
                    UPDATE books
                    SET language_code=%s, title_google = %s, author  = %s, summary = %s, isbn = %s, cover_image_url = %s
                    WHERE id = %s;
                """
                self.cursor.execute(update_query, (language, title_google,  authors, summary, isbn, cover_image, record_id))
                st.success(f'processed: {description}' )
                self.connection.commit()  # Commit the transaction

        except Exception as e:
            print(f"Error fetching data: {e}")  # Using print for error handling (you can use logging too)
            return pandas.DataFrame()  # Return an empty DataFrame in case of an error

