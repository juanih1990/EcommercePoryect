import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20' 
import userModel from '../dao/models/user.model.js'
import { generarToken } from '../utils.js'
import config from '../config/config.js'

const initializePassport = () => {
    console.log("entro a passport")
    console.log(config.CLIENTIDGMAILPASSPORT)
    
    passport.use('google', new GoogleStrategy({
        clientID: config.CLIENTIDGMAILPASSPORT,
        clientSecret: config.CLIENTSECRETGMAILPASSPORT,
        callbackURL: "/api/sessions/googlecallback"
    }, async (accessToken, refreshToken, profile, done) =>{
        
        try {
            console.log(profile)
           
                const user = await userModel.findOne({email:profile._json.email}).lean().exec()
                done(null, user)
          
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {

        const user = await userModel.findById(id)
        done(null, user)
    })


}
export default initializePassport