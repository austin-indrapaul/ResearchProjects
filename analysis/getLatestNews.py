import requests

def get_latest_news(type=""):
    type = rephrase_type(type)
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

def rephrase_type(type):
    if type == "GNI":
        return "Gross National income"
    elif type == "POPULATION":
        return "Population related news"
    elif type == "IT-INDEX":
        return "NASDAQ100 technology"
    else:
        return type