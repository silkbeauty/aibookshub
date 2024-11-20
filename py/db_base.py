import streamlit as st
import psycopg2

import dotenv
CFG = dotenv.dotenv_values(".env")

class DBase:

    def __init__(self):
        try:
            self.connection = psycopg2.connect(CFG['H_POSTGRESQL_URI'])  # Connect to the database
            self.cursor = self.connection.cursor()  # Initialize a cursor

        except Exception as e:
            st.error(f"Failed to connect to the database: {e}")
            raise

    def db_close(self):
        """Call this method to close the cursor and connection when done."""
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()