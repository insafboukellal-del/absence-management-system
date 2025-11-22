$(document).ready(function () {

    /* -------------------------------------
       EXERCISE 1: count absences + participation
    ---------------------------------------*/

    function updateTable() {
        $("#attendanceTable tbody tr").each(function () {
            let abs = 0;
            let par = 0;

            $(this).find("td").each(function () {
                let text = $(this).text().trim();

                // Count absence = empty S cell
                if ($(this).index() >= 2 && $(this).index() <= 7) {
                    if (text !== "✓") abs++;
                }

                // Count participation = ✓ in P cells
                if ($(this).index() >= 8 && $(this).index() <= 13) {
                    if (text === "✓") par++;
                }
            });

            $(this).find("td:eq(14)").text(abs);
            $(this).find("td:eq(15)").text(par);

            // Row colors
            $(this).removeClass("green yellow red");
            if (abs < 3) $(this).addClass("green");
            else if (abs <= 4) $(this).addClass("yellow");
            else $(this).addClass("red");

            // Message
            let msg = "";
            if (abs < 3 && par > 3) msg = "Good attendance – Excellent participation";
            else if (abs >= 5) msg = "Excluded – too many absences";
            else msg = "Warning – Improve attendance";

            $(this).find("td:eq(16)").text(msg);
        });
    }

    updateTable();



    /* -------------------------------------
       EXERCISE 2 + 3: FORM VALIDATION + ADD ROW
    ---------------------------------------*/

    $("#studentForm").submit(function (e) {
        e.preventDefault();
        $(".error").text("");

        let valid = true;

        let id = $("#studentID").val().trim();
        let last = $("#lastName").val().trim();
        let first = $("#firstName").val().trim();
        let email = $("#email").val().trim();

        // ID
        if (!/^[0-9]+$/.test(id)) {
            $("#studentID").next(".error").text("Only numbers required");
            valid = false;
        }

        // Names
        if (!/^[a-zA-Z]+$/.test(last)) {
            $("#lastName").next(".error").text("Letters only");
            valid = false;
        }

        if (!/^[a-zA-Z]+$/.test(first)) {
            $("#firstName").next(".error").text("Letters only");
            valid = false;
        }

        // Email
        if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
            $("#email").next(".error").text("Invalid email");
            valid = false;
        }

        if (!valid) return;

        // Add new row
        let newRow = `
            <tr>
                <td>${last}</td>
                <td>${first}</td>

                <td></td><td></td><td></td><td></td><td></td><td></td>
                <td></td><td></td><td></td><td></td><td></td><td></td>

                <td></td>
                <td></td>
                <td></td>
            </tr>
        `;

        $("#attendanceTable tbody").append(newRow);

        updateTable();

        $("#confirmation").text("Student added successfully!").css("color", "green");

        $("#studentForm")[0].reset();
    });



    /* -------------------------------------
       EXERCISE 4: REPORT
    ---------------------------------------*/

    $("#showReport").click(function () {

        let total = $("#attendanceTable tbody tr").length;

        let present = 0;
        let participated = 0;

        $("#attendanceTable tbody tr").each(function () {
            let abs = parseInt($(this).find("td:eq(14)").text());
            let par = parseInt($(this).find("td:eq(15)").text());

            if (abs < 6) present++;
            if (par > 0) participated++;
        });

        $("#reportSection").html(`
            <h3>Report</h3>
            <p>Total Students: ${total}</p>
            <p>Present: ${present}</p>
            <p>Participated: ${participated}</p>
        `);
    });



    /* -------------------------------------
       EXERCISE 5: HOVER + CLICK
    ---------------------------------------*/

    $("#attendanceTable tbody").on("mouseenter", "tr", function () {
        $(this).addClass("hover");
    });

    $("#attendanceTable tbody").on("mouseleave", "tr", function () {
        $(this).removeClass("hover");
    });

    $("#attendanceTable tbody").on("click", "tr", function () {
        let name = $(this).find("td:eq(0)").text() + " " + $(this).find("td:eq(1)").text();
        let abs = $(this).find("td:eq(14)").text();

        alert(name + "\nAbsences: " + abs);
    });



    /* -------------------------------------
       EXERCISE 6: Highlight Excellent Students
    ---------------------------------------*/

    $("#highlightBtn").click(function () {
        $("#attendanceTable tbody tr").each(function () {
            let abs = parseInt($(this).find("td:eq(14)").text());
            if (abs < 3) {
                $(this).fadeOut(200).fadeIn(200);
            }
        });
    });

    $("#resetBtn").click(function () {
        updateTable();
    });



    /* -------------------------------------
       EXERCISE 7: Search + Sort
    ---------------------------------------*/

    // Search
    $("#searchInput").on("keyup", function () {
        let value = $(this).val().toLowerCase();

        $("#attendanceTable tbody tr").filter(function () {
            $(this).toggle(
                $(this).text().toLowerCase().indexOf(value) > -1
            );
        });
    });

    // Sort by Absences Asc
    $("#sortAbs").click(function () {
        let rows = $("#attendanceTable tbody tr").get();

        rows.sort(function (a, b) {
            return parseInt($(a).find("td:eq(14)").text()) -
                   parseInt($(b).find("td:eq(14)").text());
        });

        $.each(rows, function (i, row) {
            $("#attendanceTable tbody").append(row);
        });

        $("#sortMessage").text("Currently sorted by absences (ascending)");
    });

    // Sort by Participation Desc
    $("#sortPar").click(function () {
        let rows = $("#attendanceTable tbody tr").get();

        rows.sort(function (a, b) {
            return parseInt($(b).find("td:eq(15)").text()) -
                   parseInt($(a).find("td:eq(15)").text());
        });

        $.each(rows, function (i, row) {
            $("#attendanceTable tbody").append(row);
        });

        $("#sortMessage").text("Currently sorted by participation (descending)");
    });

});
