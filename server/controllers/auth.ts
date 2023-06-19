import User from '../models/userModel';
import bcrypt from 'bcrypt';

export const register = async (req:any, res:any, next:any) => {
    try {
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({username});

        if (usernameCheck) 
            return res.json({msg: "username already exists", status: 400});
            const emailCheck = await User.findOne({email});
        if (emailCheck) 
            return res.json({msg: "email already exists", status: 400});
        
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // delete user.password;

        return res.json({msg: "user created", user, status: 201});
    } catch (error) {
        next(error);
    }
    
}

export const login = async (req:any, res:any, next:any) => {
    
}