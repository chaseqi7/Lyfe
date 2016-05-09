/**
 * Created by and Ziming Qi
 *              on 4/17/2016.
 */

function doValidate_frmAdd() {
    var form = $("#frmAdd");
    //validation logic
    form.validate({
        rules:{
            datToday:{
                required: true
            },
            txtQ1:{
                required: true,
                rangelength:[2,140]
            },
            txtQ2:{
                required: true,
                rangelength:[2,140]
            },
            txtQ3:{
                required: true,
                rangelength:[2,140]
            }

        },
        messages:{
            datToday:{
                required: "Date is required"
            },
            txtQ1:{
                required: "Answer 1 required",
                rangelength:"Answers must be between 2 and 140 characters"
            },
            txtQ2:{
                required: "Answer 2 required",
                rangelength:"Answers must be between 2 and 140 characters"
            },
            txtQ3:{
                required: "Answer 3 required",
                rangelength:"Answers must be between 2 and 140 characters"
            }
        }
    });


    //validation logic ends
    return form.valid();
}
function doValidate_frmEdit() {
    var form = $("#frmEdit");
    //validation logic
    form.validate({
        rules:{
            datEditToday:{
                required: true
            },
            txtEditQ1:{
                required: true,
                rangelength:[2,140]
            },
            txtEditQ2:{
                required: true,
                rangelength:[2,140]
            },
            txtEditQ3:{
                required: true,
                rangelength:[2,140]
            }

        },
        messages:{
            datEditToday:{
                required: "Date is required"
            },
            txtEditQ1:{
                required: "Answer 1 required",
                rangelength:"Answers must be between 2 and 140 characters"
            },
            txtEditQ2:{
                required: "Answer 2 required",
                rangelength:"Answers must be between 2 and 140 characters"
            },
            txtEditQ3:{
                required: "Answer 3 required",
                rangelength:"Answers must be between 2 and 140 characters"
            }
        }
    });


    //validation logic ends
    return form.valid();
}

function doValidate_frmFeeling() {
    var form = $("#frmFeeling");
    //validation logic
    form.validate({
        rules:{
            txtAddFeeling:{
                required: true,
                rangelength: [2,10]
            }

        },
        messages:{
            txtAddFeeling:{
                required: "Add feeling is required",
                rangelength: "Feeling length must be between 2-10"
            }
        }
    });


    //validation logic ends
    return form.valid();
}