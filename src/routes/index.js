const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demo');
/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Demo records
 */

/**
 * @swagger
 * path:
 *  /:
 *    post:
 *      summary: List all filtered records
 *      tags: [Records]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/demoRequest'
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/demoResponse'
 *        "400":
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/demoResponse'
 *        "500":
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/serverError'
 */

router.post('/', demoController.demoPost);

module.exports = router;
