import myCopyright from './modules/copyright';
import Controller from './controller';
import { state } from './model';

const controller = new Controller();
controller.calculate();
myCopyright('KJ Roelke', 'kjroelke.online');
