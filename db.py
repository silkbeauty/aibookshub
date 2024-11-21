import streamlit as st, os
import dotenv
CFG = dotenv.dotenv_values(".env")

from py.db_base_db import DGeneral
from py.db_summary import DSummary
db_summary = DSummary()
db_general = DGeneral()

tab1, tab2, tab3, tab4 = st.tabs(["Show", 'Load','Summary',''])

with tab1: db_general.show_one_table(table_name='books',)

with tab2:
    folder_path = st.text_input('Enter the folder path E:/aiBooks/ :', '')

    if folder_path:
        if os.path.isdir(folder_path):
            # List all directories (subfolders) in the given folder path
            folders_in_folder = [f for f in os.listdir(folder_path) if os.path.isdir(os.path.join(folder_path, f))]

            st.write(f"Subfolders in '{folder_path}':")
            st.write(folders_in_folder)
        else:
            st.write("The folder path is invalid or does not exist.")



        if st.button("Load?"):
            # db_general.check_and_insert(directory ="E:/aiBooks/1100_AI/CV")
            db_general.load_books_from_folder(directory = folder_path)
            st.success('done')


with tab3:
    if st.button(f"Get Summary?"):
        result = db_summary.get_summary()
        st.success('done')
