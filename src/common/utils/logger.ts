import debug, { Debugger } from 'debug';

const Logger = (namespace: string): Debugger => debug(`sabesp:${namespace}`);

export default Logger;
