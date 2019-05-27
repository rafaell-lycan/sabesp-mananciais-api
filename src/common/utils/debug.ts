import debug, { Debugger } from 'debug';

const Debug = (namespace: string): Debugger => debug(`sabesp:${namespace}`);

export default Debug;
