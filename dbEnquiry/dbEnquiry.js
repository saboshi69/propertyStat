const fs = require("nano-fs")
const _ = require("lodash")

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

function filterRegion(arr, u) {
    let x = false;
    for (let element of arr) {
        if (u.sRegion == element) {
            x = true
        }
    }
    return x
}

function filterTime(duration, u) {
    let today = new Date();
    let diff = today - u.date
    let rightDiff = 1000 * 60 * 60 * 24 * duration;
    if (duration != 12) {
        if (rightDiff >= diff) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}

async function dbData(json) {
    let jsonArr = await _.toPairs(json).filter((u) => { return u[1][0] != undefined })
    let result = await knex.select("sRegion", "actualArea", "price", "actualPrice", "date").from("alladdress")
    for (let col of jsonArr) {
        if (col[0] == "sRegion") {
            result = await result.filter((u) => {
                return filterRegion(col[1], u)
            })
        } else {
            if (col[1][0].includes("<")) {
                result = await result.filter((u) => {
                    return u[`${col[0]}`] < Number(col[1][0].slice(1))
                })
            } else if (col[1][0].includes(">")) {
                result = await result.filter((u) => {
                    return u[`${col[0]}`] > Number(col[1][0].slice(1))
                })
            } else if (col[1][0].includes("-")) {
                let arr = col[1][0].split("-");
                result = await result.filter((u) => {
                    return u[`${col[0]}`] > Number(arr[0]) && u[`${col[0]}`] < Number(arr[1])
                })
            } else {
                let duration = Number(col[1][0])
                result = await result.filter((u) => {
                    return filterTime(duration, u)
                })
            }
        }
    }
    return result
}


module.exports = dbData;

