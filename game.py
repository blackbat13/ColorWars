import random
import math
from lib.settings import Settings


class Game:
    def __init__(self):
        self._settings: Settings = Settings()
        self._canvas = document.getElementById('game_canvas')
        self._canvas.width = self._canvas.clientWidth
        self._canvas.height = self._canvas.clientHeight

        self._settings.width = self._canvas.width
        self._settings.height = self._canvas.height

        self._context = self._canvas.getContext('2d')

        self._board: list = []
        self._colors: list = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']

        self._current_player: int = 0
        self._players_position: list = [(0, 0), (self._settings.game_size - 1, self._settings.game_size - 1)]
        self._players_score: list = [0, 0]
        self._current_player_span = document.getElementById("span_current_player")
        self._buttons = []

    def start(self):
        self._generate_buttons()
        self._generate_board()
        self._draw()
        self._disable_buttons()

    def _computer_move(self) -> int:
        # return self._random_computer()
        return self._greedy_computer()

    def _random_computer(self) -> int:
        color = random.randint(0, len(self._colors) - 1)
        while not self._check_if_color_available(color):
            color = random.randint(0, len(self._colors) - 1)

        return color

    def _greedy_computer(self) -> int:
        board_copy = [[self._board[x][y] for y in range(self._settings.game_size)] for x in
                      range(self._settings.game_size)]
        px, py = self._players_position[self._current_player]
        max_points = -1
        max_color = -1
        for color in range(len(self._colors)):
            if not self._check_if_color_available(color):
                continue
            self._change_color(px, py, self._board[px][py], color)
            points = self._change_color(px, py, color, -1)
            if points > max_points:
                max_points = points
                max_color = color
            self._board = [[board_copy[x][y] for y in range(self._settings.game_size)] for x in
                           range(self._settings.game_size)]

        self._board = [[board_copy[x][y] for y in range(self._settings.game_size)] for x in
                       range(self._settings.game_size)]
        return max_color

    def _generate_buttons(self):
        buttons_div = document.getElementById("buttons_div")
        for i in range(len(self._colors)):
            buttons_div.innerHTML += "<button type='button' id='button_color_" + str(
                i) + "' onclick='game.make_move(" + str(
                i) + ")' style='background-color: " + self._colors[i] + "' class='btn btn-lg'>" + str(i) + "</button>"
        for i in range(len(self._colors)):
            self._buttons.append(document.getElementById("button_color_" + str(i)))

    def _enable_buttons(self):
        for button in self._buttons:
            button.disabled = False

    def _disable_buttons(self):
        for (x, y) in self._players_position:
            self._buttons[self._board[x][y]].disabled = True

    def _draw(self):
        self._clear_canvas()
        self._draw_board()

    def _clear_canvas(self):
        self._context.fillStyle = "#ffffff"
        self._context.fillRect(0, 0, self._settings.width, self._settings.height)

    def make_move(self, color: int):
        if not self._check_if_color_available(color):
            return
        x, y = self._players_position[self._current_player]
        self._change_color(x, y, self._board[x][y], color)
        self._draw_board()
        self._players_score[self._current_player] = self._change_color(x, y, color, -1)
        self._change_color(x, y, -1, color)
        document.getElementById("span_player_" + str(self._current_player) + "_score").innerHTML = str(
            self._players_score[self._current_player])
        self._current_player = (self._current_player + 1) % len(self._players_position)
        self._current_player_span.innerHTML = str(self._current_player + 1)
        self._enable_buttons()
        self._disable_buttons()
        if self._current_player == 1 and self._settings.computer:
            self.make_move(self._computer_move())

    def _check_if_color_available(self, color: int):
        for i in range(len(self._players_position)):
            x, y = self._players_position[i]
            if self._board[x][y] == color:
                return False
        return True

    def _generate_board(self):
        self._board = [[random.randint(0, len(self._colors) - 1) for _ in range(self._settings.game_size)] for _ in
                       range(self._settings.game_size)]

    def _draw_board(self):
        for x in range(self._settings.game_size):
            for y in range(self._settings.game_size):
                self._context.fillStyle = self._colors[self._board[x][y]]
                self._draw_hexagon(x, y)
                if self._settings.show_coordinates:
                    self._draw_text(x, y, "(" + str(x) + "," + str(y) + ")")

    def _draw_player_names(self):
        x, y = self._players_position[0]
        self._draw_text(x, y, "P1")
        x, y = self._players_position[1]
        self._draw_text(x, y, "P2")

    def _draw_text(self, x, y, text):
        x, y = self._coord_to_hex(x, y)
        self._context.fillStyle = "#000000"
        self._context.fillText(text, x + self._settings.place_size / 2, y + self._settings.place_size)

    def _coord_to_hex(self, x, y):
        hexagonAngle = 0.523598776
        sideLength = self._settings.place_size

        hexHeight = math.sin(hexagonAngle) * sideLength
        hexRadius = math.cos(hexagonAngle) * sideLength
        hexRectangleWidth = 2 * hexRadius
        return x * hexRectangleWidth + ((y % 2) * hexRadius), y * (sideLength + hexHeight)

    def _draw_hexagon(self, x, y):
        x, y = self._coord_to_hex(x, y)
        hexagonAngle = 0.523598776
        sideLength = self._settings.place_size

        hexHeight = math.sin(hexagonAngle) * sideLength
        hexRadius = math.cos(hexagonAngle) * sideLength
        hexRectangleHeight = sideLength + 2 * hexHeight
        hexRectangleWidth = 2 * hexRadius

        self._context.beginPath()
        self._context.moveTo(x + hexRadius, y)
        self._context.lineTo(x + hexRectangleWidth, y + hexHeight)
        self._context.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength)
        self._context.lineTo(x + hexRadius, y + hexRectangleHeight)
        self._context.lineTo(x, y + sideLength + hexHeight)
        self._context.lineTo(x, y + hexHeight)
        self._context.closePath()

        self._context.fill()
        self._context.fillStyle = "#000000"
        self._context.stroke()

    def _change_color(self, x, y, old_color, new_color):
        if x < 0 or y < 0:
            return 0
        if x >= self._settings.game_size or y >= self._settings.game_size:
            return 0
        if self._board[x][y] != old_color:
            return 0

        score = 1
        self._board[x][y] = new_color
        if y % 2 == 0:
            score += self._change_color(x - 1, y - 1, old_color, new_color)
            score += self._change_color(x - 1, y, old_color, new_color)
            score += self._change_color(x - 1, y + 1, old_color, new_color)
            score += self._change_color(x, y - 1, old_color, new_color)
            score += self._change_color(x + 1, y, old_color, new_color)
            score += self._change_color(x, y + 1, old_color, new_color)
        else:
            score += self._change_color(x, y - 1, old_color, new_color)
            score += self._change_color(x - 1, y, old_color, new_color)
            score += self._change_color(x, y + 1, old_color, new_color)
            score += self._change_color(x + 1, y - 1, old_color, new_color)
            score += self._change_color(x + 1, y, old_color, new_color)
            score += self._change_color(x + 1, y + 1, old_color, new_color)

        return score


game = Game()
