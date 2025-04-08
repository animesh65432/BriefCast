import { Request, Response } from "express"
import db from "../../prisma"
import bcryprt from "bcrypt"
import asyncErrorHandler from "../../Errorhandlers"


const signup = asyncErrorHandler(async (req: Request, res: Response) => {
    const { Name, Email, PassWord } = req.body

    if (!Name || !Email || !PassWord) {
        res.status(400).json({
            message: "Invalid credentials. All fields are required."
        })
        return

    }
    const hashpassword = await bcryprt.hash(PassWord, 10)
    await db.users.create({
        data: {
            Name,
            Email,
            PassWord: hashpassword
        }
    })
    res.status(200).json({
        message: "sucessfully create user"
    })

})

const login = asyncErrorHandler(async (req: Request, res: Response) => {
    const { Email, PassWord } = req.body;

    const user = await db.users.findUnique({
        where: { Email },
    });

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return
    }

    const isMatch = await bcryprt.compare(PassWord, user.PassWord as string);

    if (!isMatch) {
        res.status(401).json({ message: "Invalid password" });
        return
    }


    res.status(200).json({
        message: "Login successful",
        user
    });
});

export { signup, login };