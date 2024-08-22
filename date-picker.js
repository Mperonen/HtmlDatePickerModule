var date_picker = null;

class DatePicker
{
    constructor()
    {
        this.date = new Date();
        this.date_picker = document.querySelector("#date-picker");
        this.selects = this.date_picker.querySelectorAll("select");

        this.initSelectMonth();
        this.initSelectYear();
        this.initDaysOfWeek();
        
        this.updateYear();
        this.updateMonth();
        this.updateDays();

        this.updateSelectedDateTime();

        document.querySelector("#date-picker-select-month").onchange = this.setMonth.bind(this);
        document.querySelector("#date-picker-select-year").onchange = this.setYear.bind(this);

        document.querySelector("#date-picker-previous-month").onclick = this.setPreviousMonth.bind(this);
        document.querySelector("#date-picker-next-month").onclick = this.setNextMonth.bind(this);
    }

    // Builds month options menu based on document language
    initSelectMonth()
    {
        if (document.documentElement.lang === "fi")
        {
            var month_names = ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"];
        }
        else
        {
            var month_names = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        }

        let months = document.querySelector("#date-picker-select-month");
        let index = 0;
        for (let opt of months.querySelectorAll("option"))
        {
            opt.innerHTML = month_names[index];
            index++;
        }
    }


    initSelectYear()
    {
        this.selects[1].innerHTML = "";

        let start_year = this.date.getFullYear()-100;
        let end_year = start_year + 200;
        let option_template = document.createElement("option");
        while(start_year < end_year)
        {
            let new_option = option_template.cloneNode(true);
            new_option.innerHTML = start_year;
            new_option.value = start_year;
            
            if (this.date.getFullYear() == start_year)
            {
                new_option.selected = true;
            }
    
            this.selects[1].appendChild(new_option);
    
            start_year++;
        }
    }


    initDaysOfWeek()
    {
        if (document.documentElement.lang === "fi")
        {
            var day_names = ["M", "T", "K", "T", "P", "L", "S"];
        }
        else
        {
            var day_names = ["M", "T", "W", "T", "F", "S", "S"];
        }

        let days_of_week = document.querySelector("#days-of-week");

        let index = 0;
        for (let btn of days_of_week.querySelectorAll("button"))
        {
            btn.innerHTML = day_names[index];
            index++;
        }
    }


    setMonth(event)
    {
        this.date.setMonth(event.target.value);
        this.updateDays();
        this.updateSelectedDateTime();
    }

    setYear(event)
    {
        this.date.setYear(event.target.value);
        this.updateDays();
        this.updateSelectedDateTime();
    }

    setDay(event)
    {
        let days = document.querySelector("#date-picker-days");
        let buttons = days.querySelectorAll("button");
        for (let btn of buttons)
        {
            btn.classList.remove("active-day");
        }

        event.target.classList = "active-day";
        this.date.setDate(parseInt(event.target.innerHTML));
        this.updateSelectedDateTime();
    }

    setPreviousMonth(event)
    {
        this.date.setMonth(this.date.getMonth() - 1);
        this.updateYear();
        this.updateMonth();
        this.updateDays();
        this.updateSelectedDateTime();
    }

    setNextMonth(event)
    {
        this.date.setMonth(this.date.getMonth() + 1);
        this.updateYear();
        this.updateMonth();
        this.updateDays();
        this.updateSelectedDateTime();
    }

    updateSelectedDateTime()
    {
        let d = this.date.getDate().toString().padStart(2, 0);
        let m = (this.date.getMonth() + 1).toString().padStart(2, 0);
        let y = this.date.getFullYear();

        let time = this.date.toLocaleString(undefined, {timeStyle: "short"}).replace(".", ":");

        this.date_picker.querySelector("#date-picker-selected-date").innerHTML = `${d}.${m}.${y}`;
        this.date_picker.querySelector("#date-picker-selected-time").innerHTML = time;
    }

    getDaysInMonth(month, year)
    {
        return new Date(year, month, 0).getDate();
    }

    updateDays()
    {
        let days_container = this.date_picker.querySelector("#date-picker-days");
        let buttons = days_container.querySelectorAll("button");
        let days_in_month = this.getDaysInMonth(this.date.getMonth(), this.date.getYear());

        let current_day = this.date.getDate();
        for (let btn of buttons)
        {
            let btn_value = parseInt(btn.innerHTML);
            if (btn_value <= days_in_month)
            {
                btn.disabled = false;
                btn.onclick = this.setDay.bind(this);
            }
            else
            {
                btn.disabled = true;
                btn.removeAttribute("onclick");
            }

            if (btn_value === current_day)
            {
                btn.classList = "active-day";
            }
            else
            {
                btn.classList = "";
            }

        }
    }

    updateMonth()
    {
        let select_month = this.date_picker.querySelector("#date-picker-select-month");
        let months = select_month.querySelectorAll("option");
        let current_month = String(this.date.getMonth());
        for (let m of months)
        {
            if (m.value === current_month)
            {
                m.selected = "selected";
            }
        }
    }

    updateYear()
    {
        let select_year = this.date_picker.querySelector("#date-picker-select-year");
        let years = select_year.querySelectorAll("option");
        for (let y of years)
        {
            if (parseInt(y.value) === parseInt(this.date.getFullYear()))
            {
                y.selected = "selected";
            }
        }
    }
}




window.onload = function()
{
    var date_picker = new DatePicker();
}