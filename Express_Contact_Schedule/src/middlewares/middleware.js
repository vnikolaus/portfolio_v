exports.middleware_global = (req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.sucess = req.flash('sucess');
    res.locals.user = req.session.user;
    next();
}

exports.md_check_error_csrf = (err, req, res, next) => {
    if (err) {
        return res.render('404');
    }
    next();
}

exports.md_token_csrf = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.login_required = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    if (!req.session.user) {
        req.flash('error', 'User have to be logged.');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
};