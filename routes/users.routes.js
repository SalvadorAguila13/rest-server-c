const { Router } = require("express");
const { getUser, postUser, putUser, patchUser, deleteUser } = require("../controllers/users.controller");
const router = Router();

router.get('/get', getUser)

router.put('/put', putUser)

router.put('/put/:id', putUser)

router.post('/post', postUser)

router.patch('/patch', patchUser)

router.delete('/delete', deleteUser)

module.exports = router