class PredictorRequestComponent:
    def __init__(self):
        self.RealEstateIndex = None
        self.IT_Index = None
        self.message = None

    def setPopulation(self, realEstateIndex):
        self.RealEstateIndex = realEstateIndex

    def setOilPrice(self, it_index):
        self.IT_Index = it_index

    def setMessgae(self, message):
        self.message = message