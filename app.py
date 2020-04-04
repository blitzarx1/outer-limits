import json

import fastapi
import fastapi.responses as responses
import fastapi.staticfiles as staticfiles
import uvicorn

app = fastapi.FastAPI()

app.mount("/static", staticfiles.StaticFiles(directory="static"), name="static")

@app.get('/')
def index():
  return responses.FileResponse('static/index.html')

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
