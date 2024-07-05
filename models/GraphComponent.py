class GraphComponent:
    def __init__(self):
        self.image_path = []
        self.description = None
        self.external_link = None

    def setImagePath(self, image_path):
        self.image_path.append(image_path)

    def setDescription(self, description):
        self.description = description

    def setExternalLink(self, external_link):
        self.external_link = external_link