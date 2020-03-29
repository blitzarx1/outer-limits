from uvicorn import run
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get('/')
def index():
  return FileResponse('static/index.html')

if __name__ == "__main__":
    run(app, host="0.0.0.0", port=8000)