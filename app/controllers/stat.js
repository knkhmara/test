'use strict';
const express = require('express');
const router = express.Router();
const { validators: { stat_user } } = require('./../middlewares');
const knex = require('./../libs/knex');
const { map, find } = require('lodash');
const moment = require('moment');
const async = require('async');

/* Get stat work per user */
router.get('/:user_id', stat_user, (req, res, next) => {
  async.parallel(
    {
      per_day: callback => {
        knex('track_lines as tl')
          .select('tl.date_task as date')
          .select(knex.raw('sum(tl.hours) as total'))
          .where('tl.user_id', req.params.user_id)
          .whereRaw('DATE_FORMAT(tl.date_task, "%Y-%m") = ?', [req.query.month])
          .groupBy('tl.date_task')
          .then(data => {
            let per_date = map(req.month_days, row => {
              let count = find(data, item => moment(item.date).format('YYYY-MM-DD') === row);
              return {
                date: row,
                total: count ? count.total : 0
              };
            });
            callback(null, per_date);
          })
          .catch(next);
      },
      per_status: callback => {
        knex('track_lines as tl')
          .select('tl.status')
          .select(knex.raw('count(id) as total'))
          .where('tl.user_id', req.params.user_id)
          .whereRaw('DATE_FORMAT(tl.date_task, "%Y-%m") = ?', [req.query.month])
          .groupBy('tl.status')
          .then(data => callback(null, data))
          .catch(next);
      }
    },
    (err, results) => {
      if (err) return next(err);
      res.json(results);
    }
  );
});

module.exports = router;
