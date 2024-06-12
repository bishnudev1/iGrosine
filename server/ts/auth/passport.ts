import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { PassportStatic } from 'passport';
import User,  {UserDocument}  from '../models/User';

interface ExtendedProfile extends Profile {
    emails?: Array<{ value: string, verified: boolean }>;
    photos?: Array<{ value: string }>;
}

export const loginWithGoogle = (passport: PassportStatic) => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile: ExtendedProfile, done) => {
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name?.givenName || '',
                lastName: profile.name?.familyName || '',
                image: profile.photos?.[0]?.value || '',
                email: profile.emails?.[0]?.value || ''
            };

            try {
                let user: UserDocument | null = await User.findOne({ googleId: profile.id });

                if (user) {
                    done(null, user);
                } else {
                    user = await User.create(newUser);
                    done(null, user);
                }
            } catch (error) {
                console.log(error);
                done(error, false);
            }
        })
    );
    
    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, (user as UserDocument).id);
    });

    // used to deserialize the user
    passport.deserializeUser((id: string, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err, null);
            });
    });
};
