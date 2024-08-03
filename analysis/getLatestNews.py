import requests

def get_latest_news(type=""):
    type = rephrase_type(type)
    url = "https://api.worldnewsapi.com/search-news?text="+type+"&language=en&source-countries=us&sort=publish-time&sort-direction=DESC"
    api_key = "860da77fdb19487abff1da00f21ccfaf"
    headers = {
        'x-api-key': api_key
    }
    response = requests.get(url, headers=headers)
    print(response.headers)
    if response.status_code == 200:
        return formatNews(response.json())
    else:
        return f"Error: {response.status_code}"

def formatNews(response_json):
    print(response_json)
    formated_json = {}
    formated_json["title"] = response_json["news"][0]["title"];
    formated_json["text"] = response_json["news"][0]["text"];
    formated_json["author"] = response_json["news"][0]["author"];
    formated_json["sentiment_level"] = response_json["news"][0]["sentiment"];
    formated_json["publish_date"] = response_json["news"][0]["publish_date"];
    return formated_json


def rephrase_type(type):
    if type == "GNI":
        return "Gross National income"
    elif type == "POPULATION":
        return "human population related news"
    elif type == "IT-INDEX":
        return "NASDAQ100 OR IT sector OR Silicon valley"
    else:
        return type


if __name__ == '__main__':
    print(get_latest_news("GNI"))

