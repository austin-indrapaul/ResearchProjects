def test_eval_function_forumla():
    value = 16.6667
    formula = input("Enter a formula (use 'input' for current value to be substituted):\n")
    print("Entered formula: ", formula)
    formula = formula.replace("input", str(value))
    print("After substitution, formula: ", formula)
    print(eval(formula))


def test_eval_function_condition():
    value = "5"
    formula = input("Enter a formula (use 'input' for current value to be substituted):\n")
    if formula.lower().__contains__("none") or formula.lower().__contains__("null"):
        print("Not valid")
    else:
        print("Entered formula: ", formula)
        formula = formula.replace("input", str(value))
        print("After substitution, formula: ", formula)
        print(eval(formula))

# from openai import OpenAI
#
# if __name__ == '__main__':
#     API_KEY = "sk-my-test-vyAoM4HJCF0F423uvnChT3BlbkFJrcu2V2Z4Y2JQ9G080lTB"
#
#     client = OpenAI(api_key = API_KEY)
#     headers = {
#         "x-ratelimit-limit-tokens": "10"
#     }
#     stream = client.chat.completions.create(
#         model="gpt-4-turbo",
#         messages=[{"role": "user", "content": "Say this is a test"}],
#         stream=True,
#         headers=headers
#     )

import requests

def my_custom_function():
    url = "https://api.worldnewsapi.com/search-news?text=population&language=en"
    api_key = "860da77fdb19487abff1da00f21ccfaf"

    headers = {
        'x-api-key': api_key
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        return f"Error: {response.status_code}"

if __name__ == "__main__":
    print(my_custom_function()['news'][0]['title'])


    # response = Completion.create(
    #     engine="text-davinci-003",
    #     prompt="Once upon a time",
    #     max_tokens=100
    # )
    #
    # print(response.choices[0].text.strip())


# read the data from any format
# add headers if not present
# replace values based on a function
# replace the null/0/etc. values with standard ones
# remove the entire row based on condition
# truncate the no of rows
# write the data to any format
# https://chezo.uno/blog/2017-01-09_tabula-py--extract-table-from-pdf-into-python-dataframe-6c7acfa5f302/


# receive file input path

# enter conditions to remove the row
# input<0, input=NULL

# enter conditions to rplace the data in row
# input<0, input=NULL

# receive file output path


def getYearVersusUrbanPopGraph(url_prefix="."):
    plt.rcdefaults()
    plt.clf()
    plt.xticks(df["Year"], rotation=90, fontsize=5)
    plt.yticks(fontsize=5)
    plt.gca().xaxis.set_tick_params()
    plt.gca().yaxis.set_tick_params()
    plt.bar(df["Year"], df["UrbanPopulation"], 0.2, color="blue")
    plt.plot(df["Year"], df["UrbanPopulation"], color="black")
    plt.tight_layout()
    filename = url_prefix + "/static/results/graphs/urbanPopGraph.jpg";
    plt.savefig(filename, dpi=500)
    return filename


def getYearVersusRuralPopGraph(url_prefix="."):
    plt.rcdefaults()
    plt.clf()
    plt.xticks(df["Year"], rotation=90, fontsize=5)
    plt.yticks(fontsize=5)
    plt.gca().xaxis.set_tick_params()
    plt.gca().yaxis.set_tick_params()
    plt.bar(df["Year"], df["RuralPopulation"], 0.2, color="orange")
    plt.plot(df["Year"], df["RuralPopulation"], color="black")
    plt.tight_layout()
    filename = url_prefix + "/static/results/graphs/ruralPopGraph.jpg";
    plt.savefig(filename, dpi=500)
    return filename


def getYearVersusUrbanAndRuralPopGraph(url_prefix="."):
    plt.rcdefaults()
    plt.clf()
    plt.xticks(df["Year"], rotation=90, fontsize=5)
    plt.yticks(fontsize=5)
    plt.gca().xaxis.set_tick_params()
    plt.gca().yaxis.set_tick_params()
    plt.bar(df["Year"] - 0.2, df["UrbanPopulation"], 0.2, color="blue")
    plt.bar(df["Year"] + 0.2, df["RuralPopulation"], 0.2, color="orange")
    plt.plot(df["Year"], df["RuralPopulation"], color="black")
    plt.plot(df["Year"], df["UrbanPopulation"], color="black")
    plt.tight_layout()
    filename = url_prefix + "/static/results/graphs/urbanRuralPopGraph.jpg";
    plt.savefig(filename, dpi=500)
    return filename
