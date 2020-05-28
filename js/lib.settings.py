class Settings:
    def __init__(self):
        self.__width: int = 0
        self.__height: int = 0
        self.__size: int = 0
        self.__place_size: int = 0
        self.__game_size: int = 20
        self.__computer: bool = True
        self.__show_coordinates : bool = False

    @property
    def width(self) -> int:
        return self.__width

    @width.setter
    def width(self, value: int):
        self.__width = value
        self.__size = min(self.__width, self.__height)
        self.__place_size = (self.__size / self.__game_size)
        if self.__size == self.__width:
            self.__place_size /= 1.8
        else:
            self.__place_size /= 1.55

    @property
    def height(self) -> int:
        return self.__height

    @height.setter
    def height(self, value: int):
        self.__height = value
        self.__size = min(self.__width, self.__height)
        self.__place_size = self.__size // self.__game_size
        if self.__size == self.__width:
            self.__place_size /= 1.8
        else:
            self.__place_size /= 1.55

    @property
    def size(self) -> int:
        return self.__size

    @property
    def game_size(self) -> int:
        return self.__game_size

    @property
    def place_size(self) -> int:
        return self.__place_size

    @property
    def computer(self) -> bool:
        return self.__computer

    @property
    def show_coordinates(self) -> bool:
        return self.__show_coordinates
