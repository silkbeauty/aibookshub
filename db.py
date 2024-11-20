import streamlit as st
import dotenv
CFG = dotenv.dotenv_values(".env")

from py.db_base_db import DGeneral
from py.db_summary import DSummary
db_summary = DSummary()
db_general = DGeneral()

tab1, tab2, tab3, tab4 = st.tabs(["Show", 'Load','Summary',''])

with tab1: db_general.show_one_table(table_name='books',)

with tab2:
    if st.button("Load?"):
        # db_general.check_and_insert(directory ="E:/aiBooks/1100_AI/CV")
        db_general.check_and_insert(directory ="E:/aiBooks/1100_AI/ASR")
        st.success('done')


with tab3:
    if st.button(f"Get Summary?"):
        result = db_summary.get_summary()
        st.success('done')
