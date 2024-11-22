import streamlit as st, os, re
import pandas

from .db_base import DBase

class DGeneral(DBase):

    def get_one_table(self, table_name='', biz_id=8,):
        try:
            query = (f"""
                SELECT * 
                FROM {table_name};
            """)

            self.cursor.execute(query, (biz_id,))
            data = self.cursor.fetchall()
            column_names = [desc[0] for desc in self.cursor.description]
            df = pandas.DataFrame(data, columns=column_names)
            return df

        except Exception as e:
            print(f"Error fetching data: {e}")  # Using print for error handling (you can use logging too)
            return pandas.DataFrame()  # Return an empty DataFrame in case of an error


    def show_one_table(self, table_name='', biz_id=8,):
            df = self.get_one_table(table_name=table_name, biz_id=biz_id)

            st.subheader(table_name)
            st.dataframe(df)
            return df


    def load_books_from_folder(self, directory):
        try:

            filenames = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]

            for filename in filenames:
                # Check if the filename exists in the table
                book_title = filename.replace("\n", " ")
                book_title = re.sub('《', ' ', book_title)
                book_title = re.sub('/', ' ', book_title)
                book_title = re.sub('_', ' ', book_title)
                book_title = re.sub(r'\\', ' ', book_title)
                book_title = re.sub('》', ' ', book_title)
                st.write(book_title)
                self.cursor.execute("SELECT COUNT(*) FROM books WHERE title_upload = %s", (book_title,))
                if self.cursor.fetchone()[0] > 0:
                    st.write(f"'{book_title}' already exists in the database. Skipping.")
                    continue

                # Insert a new record for the filename
                self.cursor.execute("INSERT INTO books (title_upload) VALUES (%s)", (book_title,))
                st.write(f"Inserted '{book_title}' into the database.")

            self.connection.commit()  # Commit the transaction
            self.db_close()
            return True

        except Exception as e:
            print(f"Error fetching data: {e}")  # Using print for error handling (you can use logging too)
            return pandas.DataFrame()  # Return an empty DataFrame in case of an error
