// Transcrypt'ed from Python, 2020-05-26 16:07:54
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'lib.settings';
export var Settings =  __class__ ('Settings', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.__width = 0;
		self.__height = 0;
		self.__size = 0;
		self.__place_size = 0;
		self.__game_size = 20;
		self.__computer = true;
	});},
	get _get_width () {return __get__ (this, function (self) {
		return self.__width;
	});},
	get _set_width () {return __get__ (this, function (self, value) {
		self.__width = value;
		self.__size = min (self.__width, self.__height);
		self.__place_size = Math.floor (self.__size / self.__game_size);
	});},
	get _get_height () {return __get__ (this, function (self) {
		return self.__height;
	});},
	get _set_height () {return __get__ (this, function (self, value) {
		self.__height = value;
		self.__size = min (self.__width, self.__height);
		self.__place_size = Math.floor (self.__size / self.__game_size);
	});},
	get _get_size () {return __get__ (this, function (self) {
		return self.__size;
	});},
	get _get_game_size () {return __get__ (this, function (self) {
		return self.__game_size;
	});},
	get _get_place_size () {return __get__ (this, function (self) {
		return self.__place_size;
	});},
	get _get_computer () {return __get__ (this, function (self) {
		return self.__computer;
	});}
});
Object.defineProperty (Settings, 'computer', property.call (Settings, Settings._get_computer));
Object.defineProperty (Settings, 'place_size', property.call (Settings, Settings._get_place_size));
Object.defineProperty (Settings, 'game_size', property.call (Settings, Settings._get_game_size));
Object.defineProperty (Settings, 'size', property.call (Settings, Settings._get_size));
Object.defineProperty (Settings, 'height', property.call (Settings, Settings._get_height, Settings._set_height));
Object.defineProperty (Settings, 'width', property.call (Settings, Settings._get_width, Settings._set_width));;

//# sourceMappingURL=lib.settings.map