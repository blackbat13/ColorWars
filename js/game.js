// Transcrypt'ed from Python, 2020-05-26 16:07:54
var random = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {Settings} from './lib.settings.js';
import * as __module_random__ from './random.js';
__nest__ (random, '', __module_random__);
var __name__ = '__main__';
export var Game =  __class__ ('Game', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self._settings = Settings ();
		self._canvas = document.getElementById ('game_canvas');
		self._canvas.width = self._canvas.clientWidth;
		self._canvas.height = self._canvas.clientHeight;
		self._settings.width = self._canvas.width;
		self._settings.height = self._canvas.height;
		self._context = self._canvas.getContext ('2d');
		self._board = [];
		self._colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
		self._current_player = 0;
		self._players_position = [tuple ([0, 0]), tuple ([self._settings.game_size - 1, self._settings.game_size - 1])];
		self._players_score = [0, 0];
		self._current_player_span = document.getElementById ('span_current_player');
		self._buttons = [];
	});},
	get start () {return __get__ (this, function (self) {
		self._generate_buttons ();
		self._generate_board ();
		self._draw ();
		self._disable_buttons ();
	});},
	get _computer_move () {return __get__ (this, function (self) {
		return self._greedy_computer ();
	});},
	get _random_computer () {return __get__ (this, function (self) {
		var color = random.randint (0, len (self._colors) - 1);
		while (!(self._check_if_color_available (color))) {
			var color = random.randint (0, len (self._colors) - 1);
		}
		return color;
	});},
	get _greedy_computer () {return __get__ (this, function (self) {
		var board_copy = (function () {
			var __accu0__ = [];
			for (var x = 0; x < self._settings.game_size; x++) {
				__accu0__.append ((function () {
					var __accu1__ = [];
					for (var y = 0; y < self._settings.game_size; y++) {
						__accu1__.append (self._board [x] [y]);
					}
					return __accu1__;
				}) ());
			}
			return __accu0__;
		}) ();
		var __left0__ = self._players_position [self._current_player];
		var px = __left0__ [0];
		var py = __left0__ [1];
		var max_points = -(1);
		var max_color = -(1);
		for (var color = 0; color < len (self._colors); color++) {
			if (!(self._check_if_color_available (color))) {
				continue;
			}
			self._change_color (px, py, self._board [px] [py], color);
			var points = self._change_color (px, py, color, -(1));
			if (points > max_points) {
				var max_points = points;
				var max_color = color;
			}
			self._board = (function () {
				var __accu0__ = [];
				for (var x = 0; x < self._settings.game_size; x++) {
					__accu0__.append ((function () {
						var __accu1__ = [];
						for (var y = 0; y < self._settings.game_size; y++) {
							__accu1__.append (board_copy [x] [y]);
						}
						return __accu1__;
					}) ());
				}
				return __accu0__;
			}) ();
		}
		self._board = (function () {
			var __accu0__ = [];
			for (var x = 0; x < self._settings.game_size; x++) {
				__accu0__.append ((function () {
					var __accu1__ = [];
					for (var y = 0; y < self._settings.game_size; y++) {
						__accu1__.append (board_copy [x] [y]);
					}
					return __accu1__;
				}) ());
			}
			return __accu0__;
		}) ();
		return max_color;
	});},
	get _generate_buttons () {return __get__ (this, function (self) {
		var buttons_div = document.getElementById ('buttons_div');
		for (var i = 0; i < len (self._colors); i++) {
			buttons_div.innerHTML += ((((((("<button type='button' id='button_color_" + str (i)) + "' onclick='game.make_move(") + str (i)) + ")' style='background-color: ") + self._colors [i]) + "' class='btn btn-lg'>") + str (i)) + '</button>';
		}
		for (var i = 0; i < len (self._colors); i++) {
			self._buttons.append (document.getElementById ('button_color_' + str (i)));
		}
	});},
	get _enable_buttons () {return __get__ (this, function (self) {
		for (var button of self._buttons) {
			button.disabled = false;
		}
	});},
	get _disable_buttons () {return __get__ (this, function (self) {
		for (var [x, y] of self._players_position) {
			self._buttons [self._board [x] [y]].disabled = true;
		}
	});},
	get _draw () {return __get__ (this, function (self) {
		self._clear_canvas ();
		self._draw_board ();
	});},
	get _clear_canvas () {return __get__ (this, function (self) {
		self._context.fillStyle = '#ffffff';
		self._context.fillRect (0, 0, self._settings.width, self._settings.height);
	});},
	get make_move () {return __get__ (this, function (self, color) {
		if (!(self._check_if_color_available (color))) {
			return ;
		}
		var __left0__ = self._players_position [self._current_player];
		var x = __left0__ [0];
		var y = __left0__ [1];
		self._change_color (x, y, self._board [x] [y], color);
		self._draw_board ();
		self._players_score [self._current_player] = self._change_color (x, y, color, -(1));
		self._change_color (x, y, -(1), color);
		document.getElementById (('span_player_' + str (self._current_player)) + '_score').innerHTML = str (self._players_score [self._current_player]);
		self._current_player = __mod__ (self._current_player + 1, len (self._players_position));
		self._current_player_span.innerHTML = str (self._current_player + 1);
		self._enable_buttons ();
		self._disable_buttons ();
		if (self._current_player == 1 && self._settings.computer) {
			self.make_move (self._computer_move ());
		}
	});},
	get _check_if_color_available () {return __get__ (this, function (self, color) {
		for (var i = 0; i < len (self._players_position); i++) {
			var __left0__ = self._players_position [i];
			var x = __left0__ [0];
			var y = __left0__ [1];
			if (self._board [x] [y] == color) {
				return false;
			}
		}
		return true;
	});},
	get _generate_board () {return __get__ (this, function (self) {
		self._board = (function () {
			var __accu0__ = [];
			for (var _ = 0; _ < self._settings.game_size; _++) {
				__accu0__.append ((function () {
					var __accu1__ = [];
					for (var _ = 0; _ < self._settings.game_size; _++) {
						__accu1__.append (random.randint (0, len (self._colors) - 1));
					}
					return __accu1__;
				}) ());
			}
			return __accu0__;
		}) ();
	});},
	get _draw_board () {return __get__ (this, function (self) {
		for (var x = 0; x < self._settings.game_size; x++) {
			for (var y = 0; y < self._settings.game_size; y++) {
				self._context.fillStyle = self._colors [self._board [x] [y]];
				self._context.fillRect (x * self._settings.place_size, y * self._settings.place_size, self._settings.place_size, self._settings.place_size);
				self._context.strokeRect (x * self._settings.place_size, y * self._settings.place_size, self._settings.place_size, self._settings.place_size);
			}
		}
	});},
	get _change_color () {return __get__ (this, function (self, x, y, old_color, new_color) {
		if (x < 0 || y < 0) {
			return 0;
		}
		if (x >= self._settings.game_size || y >= self._settings.game_size) {
			return 0;
		}
		if (self._board [x] [y] != old_color) {
			return 0;
		}
		var score = 1;
		self._board [x] [y] = new_color;
		score += self._change_color (x + 1, y, old_color, new_color);
		score += self._change_color (x - 1, y, old_color, new_color);
		score += self._change_color (x, y + 1, old_color, new_color);
		score += self._change_color (x, y - 1, old_color, new_color);
		return score;
	});}
});
export var game = Game ();

//# sourceMappingURL=game.map