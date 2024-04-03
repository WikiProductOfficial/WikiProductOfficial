from chromadb.config import Settings

CHROMA_SETTINGS = Settings(
    host='chromadb',  # Replace with 'localhost' for development
    port=8989,
    allow_reset=True,
    anonymized_telemetry=False,
)
