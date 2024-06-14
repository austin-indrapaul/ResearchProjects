import requests

def get_latest_news(type=""):
    url = "https://api.worldnewsapi.com/search-news?text="+type+"&language=en"
    api_key = "860da77fdb19487abff1da00f21ccfaf"

    headers = {
        'x-api-key': api_key
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        return f"Error: {response.status_code}"