import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    name: {
        type: String, /*String | Number | Date | Object */
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    lastModified: {
        type: Date,
        required: true,
        default: new Date()
    }
});

const studentModel = mongoose.model('student', studentSchema, 'student');

export {studentModel};