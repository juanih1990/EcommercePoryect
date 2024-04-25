import winston from "winston"

const CustomLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4
    }
}
export const logger = winston.createLogger({
    levels: CustomLevelOptions.levels,
    transports:[
        new winston.transports.Console({
            level: 'http',
            format: winston.format.simple()
        }),
        new winston.transports.File({filename: './errors.log' , level: 'warning'})
    ]
})

export const addlogger = (req,res,next) => {
    req.logger = logger
    req.logger.http(`[${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}