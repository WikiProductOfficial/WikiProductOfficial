# class ChromaDBRouter:
#     """
#     A router to control all database operations on models in the
#     'vectordb' application.
#     """
#     route_app_labels = {'vectordb',}

#     def db_for_read(self, model, **hints):
#         """
#         Attempts to read chromadb_app models go to chromadb.
#         """
#         if model._meta.app_label in self.route_app_labels:
#             return 'chromadb'
#         return 'default'

#     def db_for_write(self, model, **hints):
#         """
#         Attempts to write chromadb_app models go to chromadb.
#         """
#         if model._meta.app_label in self.route_app_labels:
#             return 'chromadb'
#         return 'default'
    
