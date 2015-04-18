/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
 //mongo dbh56.mongolab.com:27567/sabesp -u sabesp -p sabesp
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['sabesp'],
  /**
   * Your New Relic license key.
   */
  license_key: process.env.NEW_RELIC,
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  }
}
