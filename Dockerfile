FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 CARWALE_CACHE=memory PORT=8000
WORKDIR /app
# Only what the server needs. No data/ folder: all user data lives in the visitor's browser.
COPY carwale.py ./
COPY scripts/serve.py scripts/serve.py
COPY web web
USER 65534:65534
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s CMD python -c "import urllib.request;urllib.request.urlopen('http://127.0.0.1:8000/api/search?q=x')"
CMD ["python", "scripts/serve.py"]
