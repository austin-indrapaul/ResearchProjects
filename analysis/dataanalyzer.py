from analysis import dataprocessor
from analysis.dataprocessor import *
from models.GraphComponent import *
from models.PredictorRequestComponent import *
from models.PredictorResponseComponent import *

def getYearVersusPopulationInfo():
    images_path = dataprocessor.getYearVersusGraph("population")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("The population parameter refers to the total number of people living in a specific area or country. Population size is an important factor in economic analysis as it affects various aspects of the economy, such as labor supply, consumer demand, and market size. Changes in population can have significant implications for economic growth, productivity, and resource allocation")
    info.setExternalLink("https://data.worldbank.org/indicator/SP.POP.TOTL?locations=US")
    return info

def getYearVersusInflationInfo():
    images_path = dataprocessor.getYearVersusGraph("Inflation")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("Inflation refers to the general increase in prices of goods and services over time, resulting in a decrease in the purchasing power of money. Inflation is influenced by factors such as changes in the money supply, demand and supply dynamics, and government policies. Inflation affects various aspects of the economy, including consumer purchasing power, interest rates, investment decisions, and economic stability. Monitoring and analyzing inflation is crucial for understanding the overall health of an economy and formulating appropriate monetary policies")

    info.setExternalLink("https://www.usinflationcalculator.com/inflation/current-inflation-rates/")
    return info

def getYearVersusGoldPriceInfo():
    images_path = dataprocessor.getYearVersusGraph("Gold price")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("The gold price parameter refers to the current or historical price of gold in the market. Gold is considered a valuable and widely traded commodity, and its price is influenced by various factors, including supply and demand dynamics, inflation, geopolitical events, and investor sentiment. Changes in the gold price can have implications for currency values, inflation expectations, and investor behavior ")

    info.setExternalLink("https://in.investing.com/commodities/gold-historical-data?interval_sec=monthly")
    return info

def getYearVersusOilPriceInfo():
    images_path = dataprocessor.getYearVersusGraph("Oil price")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("The oil price parameter refers to the current or historical price of oil in the market. Oil is a crucial input in various sectors of the economy, including transportation, manufacturing, and energy production. Changes in oil prices can have significant effects on production costs, consumer prices, inflation, and economic growth. Oil price fluctuations are influenced by factors such as global supply and demand dynamics, geopolitical events, and OPEC decisions")

    info.setExternalLink("https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=pet&s=f000000__3&f=m")
    return info


def getYearVersusS_PindexInfo():
    images_path = dataprocessor.getYearVersusGraph("S&P index")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("The S&P index parameter refers to the performance and value of the S&P 500 index, which is a stock market index that tracks the performance of 500 large companies listed on stock exchanges in the United States. The S&P 500 index is often used as a benchmark for the overall health and performance of the U.S. stock market. Changes in the S&P index can reflect investor sentiment, market trends, and economic conditions. It is considered an important indicator of the overall state of the economy.")

    info.setExternalLink("https://in.investing.com/indices/us-spx-500-historical-data")
    return info


def getYearVersusGNIInfo():
    images_path = dataprocessor.getYearVersusGraph("GNI")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("Gross National Income (GNI) is a measure of the total income earned by a country's residents, including income generated domestically and income earned from abroad. GNI takes into account factors such as wages, profits, rents, and net income from foreign investments. It provides insights into a country's economic performance and its ability to generate income for its residents. Changes in GNI can reflect trends in productivity, trade, investment, and economic growth")

    info.setExternalLink("https://data.worldbank.org/indicator/NY.GNP.PCAP.CD")
    return info


def getYearVersusRealestateindexInfo():
    images_path = dataprocessor.getYearVersusGraph("Realestate index")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("The real estate index parameter refers to an index that tracks the performance and value of the real estate market. Real estate is a significant sector in the economy, encompassing residential, commercial, and industrial properties. Changes in the real estate market can have wide-ranging effects on the economy, including impacts on construction activity, employment, consumer spending, and financial markets. Real estate indices provide insights into trends and fluctuations in property prices and market conditions.")

    info.setExternalLink("https://in.investing.com/indices/dj-real-estate-historical-data")
    return info

def getYearVersusITindexInfo():
    images_path = dataprocessor.getYearVersusGraph("IT index")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("The IT index parameter refers to an index that tracks the performance and value of the information technology sector. The IT sector includes companies involved in technology hardware, software, telecommunications, and internet services. The IT sector is known for its innovation, productivity growth, and contribution to economic development. Changes in the IT index can reflect trends in technology adoption, investment in research and development, and the overall performance of the technology sector. The IT index is often used as an indicator of technological progress and its impact on the economy.")

    info.setExternalLink("https://in.investing.com/indices/nasdaq-composite-historical-data")
    return info

def getPredictedValue(formData):
    population = float(formData['population'])
    oilPrice = float(formData['oil-price'])
    goldPrice = float(formData['gold-price'])
    Inflation = float(formData['inflation'])
    S_Pindex = float(formData['s_p-index'])
    GNI = float(formData['gni'])
    predicted_result = predictTheValue(population, goldPrice, oilPrice, S_Pindex, GNI, Inflation)
    return str(predicted_result)

def getDataTable(param):
    if param == "current":
        return getCurrentDataTable()
    elif param == "original":
        return getOriginalDataTable()

def save_and_regenerate(data, algorithm):
    with open("./static/datasets/dataset-temp.csv", "w") as file:
        file.write(data)
    score = regenerateModel("./static/datasets/dataset-temp.csv",algorithm)
    return score