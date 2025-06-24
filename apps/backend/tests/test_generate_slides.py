from fastapi.testclient import TestClient
from main import app
from unittest.mock import patch

client = TestClient(app)

@patch("openai.OpenAI")
def test_generate_slides(mock_openai):
    # Mock the response from OpenAI
    mock_client = mock_openai.return_value
    mock_client.chat.completions.create.return_value = {
        "choices": [
            {"message": {"content": "Mocked slide content for demo purposes."}}
        ]
    }
    response = client.post(
        "/generate-slides",
        json={"problem": "Too much plastic waste", "solution": "Biodegradable packaging"}
    )
    assert response.status_code == 200
    data = response.json()
    # Check that the mocked response structure is present
    assert "choices" in data or "slides" in data 