const express = require('express')
const db = require('../service/model')
const { Movie } = require('../models/movie')
const moment = require('moment-timezone')

exports.listMovie = async (req, res) => {
    try {
        const movies = await db._get(Movie)
        return res.render('movie/index', { movies, req: req, moment: moment })
    } catch (error) {
        console.log(error)
    }

}


exports.addMovie = (req, res) => {
    try {
        return res.render('movie/create');

    } catch (error) {
        console.log(error)
    }
}

exports.createMovie = async (req, res) => {
    console.log(req.body)
    try {
        const movie = {
            name: req.body.name,
            cast: req.body.cast,
            genre: req.body.genre,
            rating: req.body.rating,
            releaseDate: req.body.releaseDate
        }
        const movies = await db._store(Movie, movie)
        req.toastr.success('Created Successfully!');
        return res.redirect('/movie')
    } catch (error) {
        console.log(error)

    }


}

exports.getMovie = async (req, res) => {
    try {
        let movie = await db._find(Movie, { "_id": req.params.id }, {}, {});
        console.log(movie)
        return res.render('movie/edit', { movie, req: req, moment: moment })
    } catch (error) {
        console.log(error)

    }

}

exports.updateMovie = async (req, res) => {
    try {
        const movie = {
            name: req.body.name,
            cast: req.body.cast,
            genre: req.body.genre,
            rating: req.body.rating,
            releaseDate: req.body.releaseDate
        }
        const movies = await db._update(Movie, { _id: req.body.id }, movie)
        req.toastr.success('Updated Successfully!');
        console.log(movies)
        return res.redirect('/movie')
    } catch (error) {
        console.log(error)
    }

}

exports.deleteMovie = async (req, res) => {
    try {
        let movie = await db._delete(Movie, { "_id": req.params.id });
        req.toastr.success(' Deleted successfully')
        return res.redirect('/movie')
    } catch (error) {
        console.log(error)
    }

}