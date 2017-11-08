/**
 * Created by devollove9 on 2017/10/27.
 * Installed packages:
 *  from devomain-services:
 *      aws-sdk
 *      extend
 *      nodemailer
 *      nodemailer-ses-transport
 *      
 *  from devomain-middlewares:
 *      deep-filter
 *      deepcopy
 *      sprintf
 *      underscore
 *      
 *  from devomain-libs
 *      debug
 *      joi
 *      koa-ratelimit
 *      microtime
 *      ms
 *      thenify
 *      underscore
 */
import srcLoader from 'src-loader'
import devoMainMiddlewares from 'devomain-middlewares'
import devoMainConstants from 'devomain-constants'
import devoMainLibs from 'devomain-libs'
import devoMainServices from 'devomain-services'

const all = {
    srcLoader: srcLoader,
    devoMainMiddlewares: devoMainMiddlewares,
    devoMainConstants: devoMainConstants,
    devoMainLibs: devoMainLibs,
    devoMainServices: devoMainServices
}

export { srcLoader , devoMainMiddlewares , devoMainConstants , devoMainLibs , devoMainServices }
export default all