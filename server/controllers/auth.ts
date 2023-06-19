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
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username });

        if (!user)
            return res.json({msg: "Incorrect username or password", status: 404});
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            return res.json({msg: "Incorrect username or password", status: 404});

        return res.json({user, status: 200});
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async (req:any, res:any, next:any) => {
    try {
        const users = await User.find({_id: {$ne: req.params.id}}).select(["username", "email", "_id"]);
        return res.json({users, status: 200});
    } catch (err) { 
        next(err);
    }
} 