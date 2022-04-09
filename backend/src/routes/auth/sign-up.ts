import express, { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import Filter from 'bad-words';
const filter = new Filter();

import { BadRequestError } from '../../errors/bad-request-error';
import { User } from '../../models/user';
import { UserActivity } from '../../models/user-activity'
import { UserNotification } from '../../models/user-notification';
const handler = async (req: Request, res: Response) => {
    const { email, firstName, lastName, username, password, location } = req.body;

    let existingUser, existingUsername;

    existingUser = await User.findOne({ email });
    existingUsername = await User.findOne({ username });

    if (existingUser) {
        throw new BadRequestError('Email already in use');
    }

    if (existingUsername) {
        throw new BadRequestError('username already in use');

    }

    let user = User.build({
        email,
        password,
        firstName,
        lastName,
        username
    });
    await user.save();

    let userActivity = UserActivity.build({
        userId: user._id,
        comments: [],
        likes: []
    })

    await userActivity.save()

    let userNotification = UserNotification.build({
        userId: user._id,
        notifications: []
    })

    await userNotification.save()

    //generate jwt
    const userJwt = await user.generateAuthToken();
    res.status(StatusCodes.CREATED).send({ ...user.toJSON(), token: userJwt });

};


const validator = [
    check('email')
        .trim()
        .not()
        .isEmpty()
        .isEmail()
        .custom((data) => { return !filter.isProfane(data) })
        .withMessage('provide a valid email address'),
    check('firstName')
        .trim()
        .not()
        .isEmpty()
        .custom((data) => { return !filter.isProfane(data) })
        .isLength({ min: 1, max: 50 }),
    check('lastName')
        .trim()
        .not()
        .isEmpty()
        .custom((data) => { return !filter.isProfane(data) })
        .isLength({ min: 1, max: 50 }),
    check('password')
        .not()
        .isEmpty()
        .isLength({ min: 7, max: 30 })
        .not()
        .contains('password')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/)
        .withMessage(
            'provide a password with 7 letters that does not contain the word password'
        ),
    check('username')
        .trim()
        .optional()
        .custom((data) => { return !filter.isProfane(data) })
        .isLength({ min: 1, max: 50 }).withMessage('lastName can only have alphabets'),

];

export {
    handler as signUpHandler,
    validator as signUpValidator,
};
