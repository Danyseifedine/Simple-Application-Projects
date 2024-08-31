// countries
const countryTimezones = {
    'Afghanistan': 'Asia/Kabul',
    'Albania': 'Europe/Tirane',
    'Algeria': 'Africa/Algiers',
    'Andorra': 'Europe/Andorra',
    'Angola': 'Africa/Luanda',
    'Antigua and Barbuda': 'America/Antigua',
    'Argentina': 'America/Argentina/Buenos_Aires',
    'Armenia': 'Asia/Yerevan',
    'Australia': 'Australia/Sydney',
    'Austria': 'Europe/Vienna',
    'Azerbaijan': 'Asia/Baku',
    'Bahamas': 'America/Nassau',
    'Bahrain': 'Asia/Bahrain',
    'Bangladesh': 'Asia/Dhaka',
    'Barbados': 'America/Barbados',
    'Belarus': 'Europe/Minsk',
    'Belgium': 'Europe/Brussels',
    'Belize': 'America/Belize',
    'Benin': 'Africa/Porto-Novo',
    'Bhutan': 'Asia/Thimphu',
    'Bolivia': 'America/La_Paz',
    'Bosnia and Herzegovina': 'Europe/Sarajevo',
    'Botswana': 'Africa/Gaborone',
    'Brazil': 'America/Sao_Paulo',
    'Brunei': 'Asia/Brunei',
    'Bulgaria': 'Europe/Sofia',
    'Burkina Faso': 'Africa/Ouagadougou',
    'Burundi': 'Africa/Bujumbura',
    'Cambodia': 'Asia/Phnom_Penh',
    'Cameroon': 'Africa/Douala',
    'Canada': 'America/Toronto',
    'Cape Verde': 'Atlantic/Cape_Verde',
    'Central African Republic': 'Africa/Bangui',
    'Chad': 'Africa/Ndjamena',
    'Chile': 'America/Santiago',
    'China': 'Asia/Shanghai',
    'Colombia': 'America/Bogota',
    'Comoros': 'Indian/Comoro',
    'Congo': 'Africa/Brazzaville',
    'Costa Rica': 'America/Costa_Rica',
    'Croatia': 'Europe/Zagreb',
    'Cuba': 'America/Havana',
    'Cyprus': 'Asia/Nicosia',
    'Czech Republic': 'Europe/Prague',
    'Democratic Republic of the Congo': 'Africa/Kinshasa',
    'Denmark': 'Europe/Copenhagen',
    'Djibouti': 'Africa/Djibouti',
    'Dominica': 'America/Dominica',
    'Dominican Republic': 'America/Santo_Domingo',
    'East Timor': 'Asia/Dili',
    'Ecuador': 'America/Guayaquil',
    'Egypt': 'Africa/Cairo',
    'El Salvador': 'America/El_Salvador',
    'England': 'Europe/London',
    'Equatorial Guinea': 'Africa/Malabo',
    'Eritrea': 'Africa/Asmara',
    'Estonia': 'Europe/Tallinn',
    'Ethiopia': 'Africa/Addis_Ababa',
    'Fiji': 'Pacific/Fiji',
    'Finland': 'Europe/Helsinki',
    'France': 'Europe/Paris',
    'Gabon': 'Africa/Libreville',
    'Gambia': 'Africa/Banjul',
    'Georgia': 'Asia/Tbilisi',
    'Germany': 'Europe/Berlin',
    'Ghana': 'Africa/Accra',
    'Greece': 'Europe/Athens',
    'Grenada': 'America/Grenada',
    'Guatemala': 'America/Guatemala',
    'Guinea': 'Africa/Conakry',
    'Guinea-Bissau': 'Africa/Bissau',
    'Guyana': 'America/Guyana',
    'Haiti': 'America/Port-au-Prince',
    'Honduras': 'America/Tegucigalpa',
    'Hungary': 'Europe/Budapest',
    'Iceland': 'Atlantic/Reykjavik',
    'India': 'Asia/Kolkata',
    'Indonesia': 'Asia/Jakarta',
    'Iran': 'Asia/Tehran',
    'Iraq': 'Asia/Baghdad',
    'Ireland': 'Europe/Dublin',
    'Italy': 'Europe/Rome',
    'Jamaica': 'America/Jamaica',
    'Japan': 'Asia/Tokyo',
    'Jordan': 'Asia/Amman',
    'Kazakhstan': 'Asia/Almaty',
    'Kenya': 'Africa/Nairobi',
    'Kiribati': 'Pacific/Tarawa',
    'Kuwait': 'Asia/Kuwait',
    'Kyrgyzstan': 'Asia/Bishkek',
    'Laos': 'Asia/Vientiane',
    'Latvia': 'Europe/Riga',
    'Lebanon': 'Asia/Beirut',
    'Lesotho': 'Africa/Maseru',
    'Liberia': 'Africa/Monrovia',
    'Libya': 'Africa/Tripoli',
    'Liechtenstein': 'Europe/Vaduz',
    'Lithuania': 'Europe/Vilnius',
    'Luxembourg': 'Europe/Luxembourg',
    'Madagascar': 'Indian/Antananarivo',
    'Malawi': 'Africa/Blantyre',
    'Malaysia': 'Asia/Kuala_Lumpur',
    'Maldives': 'Indian/Maldives',
    'Mali': 'Africa/Bamako',
    'Malta': 'Europe/Malta',
    'Marshall Islands': 'Pacific/Majuro',
    'Mauritania': 'Africa/Nouakchott',
    'Mauritius': 'Indian/Mauritius',
    'Mexico': 'America/Mexico_City',
    'Micronesia': 'Pacific/Chuuk',
    'Moldova': 'Europe/Chisinau',
    'Monaco': 'Europe/Monaco',
    'Mongolia': 'Asia/Ulaanbaatar',
    'Montenegro': 'Europe/Podgorica',
    'Morocco': 'Africa/Casablanca',
    'Mozambique': 'Africa/Maputo',
    'Myanmar': 'Asia/Yangon',
    'Namibia': 'Africa/Windhoek',
    'Nauru': 'Pacific/Nauru',
    'Nepal': 'Asia/Kathmandu',
    'Netherlands': 'Europe/Amsterdam',
    'New Zealand': 'Pacific/Auckland',
    'Nicaragua': 'America/Managua',
    'Niger': 'Africa/Niamey',
    'Nigeria': 'Africa/Lagos',
    'North Korea': 'Asia/Pyongyang',
    'North Macedonia': 'Europe/Skopje',
    'Norway': 'Europe/Oslo',
    'Oman': 'Asia/Muscat',
    'Pakistan': 'Asia/Karachi',
    'Palau': 'Pacific/Palau',
    'Panama': 'America/Panama',
    'Papua New Guinea': 'Pacific/Port_Moresby',
    'Paraguay': 'America/Asuncion',
    'Peru': 'America/Lima',
    'Philippines': 'Asia/Manila',
    'Poland': 'Europe/Warsaw',
    'Portugal': 'Europe/Lisbon',
    'Qatar': 'Asia/Qatar',
    'Romania': 'Europe/Bucharest',
    'Russia': 'Europe/Moscow',
    'Rwanda': 'Africa/Kigali',
    'Saint Kitts and Nevis': 'America/St_Kitts',
    'Saint Lucia': 'America/St_Lucia',
    'Saint Vincent and the Grenadines': 'America/St_Vincent',
    'Samoa': 'Pacific/Apia',
    'San Marino': 'Europe/San_Marino',
    'Sao Tome and Principe': 'Africa/Sao_Tome',
    'Saudi Arabia': 'Asia/Riyadh',
    'Senegal': 'Africa/Dakar',
    'Serbia': 'Europe/Belgrade',
    'Seychelles': 'Indian/Mahe',
    'Sierra Leone': 'Africa/Freetown',
    'Singapore': 'Asia/Singapore',
    'Slovakia': 'Europe/Bratislava',
    'Slovenia': 'Europe/Ljubljana',
    'Solomon Islands': 'Pacific/Guadalcanal',
    'Somalia': 'Africa/Mogadishu',
    'South Africa': 'Africa/Johannesburg',
    'South Korea': 'Asia/Seoul',
    'South Sudan': 'Africa/Juba',
    'Spain': 'Europe/Madrid',
    'Sri Lanka': 'Asia/Colombo',
    'Sudan': 'Africa/Khartoum',
    'Suriname': 'America/Paramaribo',
    'Sweden': 'Europe/Stockholm',
    'Switzerland': 'Europe/Zurich',
    'Syria': 'Asia/Damascus',
    'Taiwan': 'Asia/Taipei',
    'Tajikistan': 'Asia/Dushanbe',
    'Tanzania': 'Africa/Dar_es_Salaam',
    'Thailand': 'Asia/Bangkok',
    'Togo': 'Africa/Lome',
    'Tonga': 'Pacific/Tongatapu',
    'Trinidad and Tobago': 'America/Port_of_Spain',
    'Tunisia': 'Africa/Tunis',
    'Turkey': 'Europe/Istanbul',
    'Turkmenistan': 'Asia/Ashgabat',
    'Tuvalu': 'Pacific/Funafuti',
    'Uganda': 'Africa/Kampala',
    'Ukraine': 'Europe/Kiev',
    'United Arab Emirates': 'Asia/Dubai',
    'USA': 'America/New_York',
    'Uruguay': 'America/Montevideo',
    'Uzbekistan': 'Asia/Tashkent',
    'Vanuatu': 'Pacific/Efate',
    'Vatican City': 'Europe/Vatican',
    'Venezuela': 'America/Caracas',
    'Vietnam': 'Asia/Ho_Chi_Minh',
    'Yemen': 'Asia/Aden',
    'Zambia': 'Africa/Lusaka',
    'Zimbabwe': 'Africa/Harare'
};

let worldMap;

// generate current date time
function setCurrentTime() {
    const now = new Date();

    const options = {
        timeZone: 'Asia/Beirut',
        hour12: false
    };
    const localTime = new Intl.DateTimeFormat('en-GB', {
        ...options,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).formatToParts(now);

    const year = localTime.find(part => part.type === 'year').value;
    const month = localTime.find(part => part.type === 'month').value;
    const day = localTime.find(part => part.type === 'day').value;
    const hour = localTime.find(part => part.type === 'hour').value;
    const minute = localTime.find(part => part.type === 'minute').value;

    const formattedDateTime = `${year}-${month}-${day}T${hour}:${minute}`;

    document.getElementById('datetime').value = formattedDateTime;
}

// fill the countries selects
function populateTimezones() {
    const fromSelect = document.getElementById('fromTimezone');
    const toSelect = document.getElementById('toTimezone');

    for (const [country, timezone] of Object.entries(countryTimezones)) {
        fromSelect.add(new Option(country, timezone));
        toSelect.add(new Option(country, timezone));
    }
}

// convert the datetime and display it
function convertTime() {
    const datetime = document.getElementById('datetime').value;
    const fromTimezone = document.getElementById('fromTimezone').value;
    const toTimezone = document.getElementById('toTimezone').value;
    const timeFormat = document.querySelector('#timeFormat:checked').value;
    const dateFormat = document.querySelector('#dateFormat:checked').value;
    const resultElement = document.getElementById('result');

    if (!datetime) {
        alert('Please enter a date and time.');
        return;
    }

    try {
        const date = new Date(datetime);

        const fromTime = new Date(date.toLocaleString('en-US', {
            timeZone: fromTimezone
        }));
        const toTime = new Date(date.toLocaleString('en-US', {
            timeZone: toTimezone
        }));

        const fromCountry = Object.keys(countryTimezones).find(key => countryTimezones[key] === fromTimezone) || 'Unknown';
        const toCountry = Object.keys(countryTimezones).find(key => countryTimezones[key] === toTimezone) || 'Unknown';

        const formatDate = (date) => `
            <p>Day: ${date.toLocaleDateString('en-US', { weekday: 'long' })}</p>
            <p>Date: ${date.toLocaleDateString('en-US', { year: 'numeric', month: dateFormat === 'MM/DD/YYYY' ? '2-digit' : 'long', day: 'numeric' })}</p>
            <p>Time: ${date.toLocaleTimeString('en-US', { hour: timeFormat == '12' ? 'numeric' : '2-digit', minute: 'numeric', second: 'numeric', hour12: timeFormat === '12' })}</p>
            <p>Time Zone: ${date.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2]}</p>
        `;

        resultElement.innerHTML = `
            <div class="result-item" style="width: 80%; border-radius: 0.25rem; background-color: hsl(0, 0%, 90%);
                padding-inline: 2rem; padding-block: 0.5rem;">
                <strong style="color: hsl(240, 100%, 35%)">${fromCountry}:</strong>
                <div style="padding-inline: 1rem;">
                    ${formatDate(fromTime)}
                </div>
            </div>
            <div class="result-item" style="width: 80%; border-radius: 0.25rem; 
                background-color: hsl(0, 0%, 90%); padding-inline: 2rem; padding-block: 0.5rem;">
                <strong style="color: hsl(122, 100%, 35%);">${toCountry}:</strong>
                <div style="padding-inline: 1rem;">
                    ${formatDate(toTime)}
                </div>
            </div>
        `;

        // Assuming updateMap() is defined elsewhere
        updateMap();
        calculateTimeDifference(fromTime, toTime);
    } catch (error) {
        return;
    }
}

// get the country from the const countryTimezones
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

// update the color of countries selected in the map
function updateMap() {
    const fromCountry = getKeyByValue(countryTimezones, document.getElementById('fromTimezone').value);
    const toCountry = getKeyByValue(countryTimezones, document.getElementById('toTimezone').value);

    console.log(d3.selectAll('.country'));


    d3.selectAll('.country')
        .classed('selectedFrom', d => d.properties.name === fromCountry);

    d3.selectAll('.country')
        .classed('selectedTo', d => d.properties.name === toCountry);
}

// get the map
function loadMap() {
    const mapContainer = document.getElementById('map');
    const width = Math.max(900, mapContainer.offsetWidth);
    const height = 350;

    const svg = d3.select("#map").append("svg").attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMinYMin meet");

    const projection = d3.geoMercator().scale(130).translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
        .then(function (data) {
            svg.selectAll("path").data(data.features).enter().append("path").attr("d", path).attr("class", "country")
                .attr("fill", "hsl(0, 0%, 95%)")
                .attr("stroke", "hsl(0, 0%, 30%)")
                .attr("stroke-width", 0.3);

            worldMap = data;
            updateMap();
        });
}

// swap the countries in selects
function swapCountries() {
    const fromSelect = document.getElementById('fromTimezone');
    const toSelect = document.getElementById('toTimezone');
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    updateMap();
    convertTime();
}

// add a compare between countries to favorites
function addToFavorites() {
    const fromCountry = document.getElementById('fromTimezone').selectedOptions[0].text;
    const toCountry = document.getElementById('toTimezone').selectedOptions[0].text;
    const favName = `${fromCountry} - ${toCountry}`;
    const favValue = `${fromCountry}|${toCountry}`;

    const favoritesSelect = document.getElementById('favorites');

    if (fromCountry == 'select a country' || toCountry == 'select a country') {
        return;
    } else {
        // Check if the favorite already exists
        if (![...favoritesSelect.options].some(option => option.value === favValue)) {
            const option = new Option(favName, favValue);
            favoritesSelect.add(option);

            // Save to localStorage
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            favorites.push({
                name: favName,
                value: favValue
            });
            localStorage.setItem('favorites', JSON.stringify(favorites));

            alert('Added Successfully');
        } else {
            alert('This favorite already exists!');
        }
    }
}

function deleteFromFavorites() {
    const favoritesSelect = document.getElementById('favorites');
    const selectedIndex = favoritesSelect.selectedIndex;

    if (selectedIndex !== 0) {
        const selectedValue = favoritesSelect.value;

        // Remove from select element
        favoritesSelect.remove(selectedIndex);

        // Remove from localStorage
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const updatedFavorites = favorites.filter(fav => fav.value !== selectedValue);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        // Clear the selection in the timezone dropdowns
        document.getElementById('fromTimezone').selectedIndex = 0;
        document.getElementById('toTimezone').selectedIndex = 0;

        // Update the map and convert time
        updateMap();
        convertTime();
    } else {
        alert('Please select a favorite to delete.');
    }
}

// choice compare from favorite select
function loadFavorite() {
    const favoritesSelect = document.getElementById('favorites');
    const selectedValue = favoritesSelect.value;

    if (selectedValue) {
        const [fromCountry, toCountry] = selectedValue.split('|');
        document.getElementById('fromTimezone').value = countryTimezones[fromCountry];
        document.getElementById('toTimezone').value = countryTimezones[toCountry];
        updateMap();
        convertTime();
    }
}

// get the favorites from the localStorage
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesSelect = document.getElementById('favorites');
    favorites.forEach(fav => {
        favoritesSelect.add(new Option(fav.name, fav.value));
    });
}

// calculate the difference hours
function calculateTimeDifference(fromTime, toTime) {
    const diffInHours = (toTime - fromTime) / (1000 * 60 * 60);
    const diffElement = document.getElementById('timeDifference');
    diffElement.style = "display: block; padding-inline: 1rem; border-radius: 0.25rem;";
    diffElement.innerHTML = `
        <p style="color: hsl(0, 100%, 50%)">Time Difference:</p>
        <p style="padding-inline: 0.5rem;">${Math.abs(diffInHours)} hours ${diffInHours >= 0 ? 'ahead' : 'behind'}</p>
    `;
}

// checkbox control
function handleCheckboxGroup(groupSelector) {
    document.querySelectorAll(groupSelector).forEach((checkbox) => {
        checkbox.addEventListener('click', function () {
            if (this.checked) {
                document.querySelectorAll(groupSelector).forEach((cb) => {
                    cb.checked = false;
                });
                this.checked = true;
            }
            convertTime();
            myTime();
        });
    });
}

// to display the user time
function myTime() {
    const timeFormat = document.querySelector('#timeFormat:checked').value;
    const dateFormat = document.querySelector('#dateFormat:checked').value;
    const myTime = document.getElementById('myTime');

    try {
        const userTime = new Date();

        const formatDate = (date) => `
            <p>Day: ${date.toLocaleDateString('en-US', { weekday: 'long' })}</p>
            <p>Date: ${date.toLocaleDateString('en-US', { year: 'numeric', month: dateFormat === 'MM/DD/YYYY' ? '2-digit' : 'long', day: 'numeric' })}</p>
            <p>Time: ${date.toLocaleTimeString('en-US', { hour: timeFormat == '12' ? 'numeric' : '2-digit', minute: 'numeric', second: 'numeric', hour12: timeFormat === '12' })}</p>
            <p>Time Zone: ${date.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2]}</p>
        `;

        myTime.innerHTML = `
            <div class="result-item" style="width: fit-content; border-radius: 0.25rem; 
                background-color: hsl(0, 0%, 95%); padding-inline: 2rem; padding-block: 0.5rem;">
                <strong style="color: hsl(360, 100%, 45%);">Your Current dateTime:</strong>
                <div style="padding-inline: 1rem;">
                    ${formatDate(userTime)}
                </div>
            </div>
        `;

    } catch (error) {
        console.error('Error converting time:', error);
        myTime.innerHTML = 'An error occurred while converting the time.';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    myTime();
    populateTimezones();
    loadMap();
    loadFavorites();
    setCurrentTime();

    handleCheckboxGroup('#timeFormat');
    handleCheckboxGroup('#dateFormat');

    const toggleButton = document.querySelector('.toggle-button');
    const sidebar = document.querySelector('.controls');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
});

document.getElementById('datetime').addEventListener('change', convertTime);
document.getElementById('fromTimezone').addEventListener('change', convertTime);
document.getElementById('toTimezone').addEventListener('change', convertTime);