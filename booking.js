$(document).ready(function () {
  function calculate() {
    var checkInDate = $("#checkin-date").val();
    var checkOutDate = $("#checkout-date").val();
    var numberOfAdults = parseInt($("#adults").val(), 10);
    var costPerDay = 150;

    var diffDays = moment(checkOutDate).diff(moment(checkInDate), "days");

    var totalCost = diffDays * numberOfAdults * costPerDay;

    $("#days").val(diffDays);
    $("#cost").val("$" + totalCost);
  }

  $("#adults, #checkin-date, #checkout-date").on("change", calculate);

  function resetForm() {
    $("form").each(function () {
      this.reset();
    });
    calculate();

    var $alert = $(
      '<div class="alert alert-info alert-dismissible fade in" role="alert" style="position: fixed; bottom: 20px; right: 20px; z-index: 10000;">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        "</button>" +
        "All Fields Cleared" +
        "</div>"
    );

    $("body").append($alert);

    setTimeout(function () {
      $alert.alert("close");
    }, 5000);
  }

  function submitForm() {
    var costValueStr = $("#cost").val().trim().replace(/^\$/, "");
    var costValue = parseFloat(costValueStr);

    if (isNaN(costValue) || costValueStr === "") {
      errorToaster("No cost was calculated");
      return;
    }

    if (costValue < 0) {
      errorToaster("Cost is negative");
      return;
    }
    var fields = [
      { id: "#username", name: "Username" },
      { id: "#fn", name: "First Name" },
      { id: "#ln", name: "Last Name" },
      { id: "#phone", name: "Phone" },
      { id: "#fax", name: "Fax" },
      { id: "#email", name: "Email" },
    ];

    var fieldMissing = false;
    var missingFieldName = "";

    fields.forEach(function (field) {
      if ($(field.id).val().trim() === "") {
        if (!fieldMissing) {
          fieldMissing = true;
          missingFieldName = field.name;
        }
        var formGroup = $(field.id).closest(".input-group").length
          ? $(field.id).closest(".form-group")
          : $(field.id).parent();
        formGroup.addClass("has-error");
      } else {
        var formGroup = $(field.id).closest(".input-group").length
          ? $(field.id).closest(".form-group")
          : $(field.id).parent();
        formGroup.removeClass("has-error");
      }
    });

    if (fieldMissing) {
      errorToaster(missingFieldName + " is missing");
    } else {
      successToaster("Submission Successful");
    }
  }

  function errorToaster(message) {
    var $alert = $(
      '<div class="alert alert-danger alert-dismissible fade in" role="alert" style="position: fixed; bottom: 20px; right: 20px; z-index: 10000;">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        "</button>" +
        message +
        "</div>"
    );

    $("body").append($alert);

    setTimeout(function () {
      $alert.remove();
    }, 5000);
  }

  function successToaster(message) {
    var $alert = $(
      '<div class="alert alert-success alert-dismissible fade in" role="alert" style="position: fixed; bottom: 20px; right: 20px; z-index: 10000;">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        "</button>" +
        message +
        "</div>"
    );

    $("body").append($alert);

    setTimeout(function () {
      $alert.remove();
    }, 5000);
  }

  // Assuming resetForm is correctly implemented elsewhere
  $(".btn.btn-primary.btn-block").on("click", resetForm);
  $(".btn.btn-success.btn-block").on("click", submitForm);
});
