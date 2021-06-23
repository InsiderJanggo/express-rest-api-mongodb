const { Router } = require("express");
const router = Router();
const {
    authenticate, 
    create,
    getAll,
    getbyID,
    _delete
} = require('./User.service');

router.post('/authenticate', auth);
router.post('/register', register);
router.get('/', getAllUser);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete_user);

function auth(req, res, next) {
    authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

function register(req, res, next) {
    create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAllUser(req, res, next) {
    getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    getbyID(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    getbyID(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete_user(req, res, next) {
    delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports = router;