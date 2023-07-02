export interface User {
  _id?: string;
  admin?: boolean;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  password?: string;
  imageUrl?: any | null;
  imageAlt?: string;
  state?: string;
  country?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  zip?: string;
  business?: boolean;
  timestamps?: string;
  error?: string
  err?: string
  message?: string
  token?: string
  lat?: number
  lng?: number
  isBlocked?: boolean
  favorites?: [string] | null;
  confirmPassword?: string
}

export const countryCoordinates = [
  {
    name: "Afghanistan",
    coordinates: { latitude: 33.93911, longitude: 67.709953 },
  },
  {
    name: "Albania",
    coordinates: { latitude: 41.153332, longitude: 20.168331 },
  },
  {
    name: "Algeria",
    coordinates: { latitude: 28.033886, longitude: 1.659626 },
  },
  {
    name: "Andorra",
    coordinates: { latitude: 42.546245, longitude: 1.601554 },
  },
  {
    name: "Angola",
    coordinates: { latitude: -11.202692, longitude: 17.873887 },
  },
  {
    name: "Antigua and Barbuda",
    coordinates: { latitude: 17.060816, longitude: -61.796428 },
  },
  {
    name: "Argentina",
    coordinates: { latitude: -38.416097, longitude: -63.616672 },
  },
  {
    name: "Armenia",
    coordinates: { latitude: 40.069099, longitude: 45.038189 },
  },
  {
    name: "Australia",
    coordinates: { latitude: -25.274398, longitude: 133.775136 },
  },
  {
    name: "Austria",
    coordinates: { latitude: 47.516231, longitude: 14.550072 },
  },
  {
    name: "Azerbaijan",
    coordinates: { latitude: 40.143105, longitude: 47.576927 },
  },
  {
    name: "Bahamas",
    coordinates: { latitude: 25.03428, longitude: -77.39628 },
  },
  {
    name: "Bahrain",
    coordinates: { latitude: 25.930414, longitude: 50.637772 },
  },
  {
    name: "Bangladesh",
    coordinates: { latitude: 23.684994, longitude: 90.356331 },
  },
  {
    name: "Barbados",
    coordinates: { latitude: 13.193887, longitude: -59.543198 },
  },
  {
    name: "Belarus",
    coordinates: { latitude: 53.709807, longitude: 27.953389 },
  },
  {
    name: "Belgium",
    coordinates: { latitude: 50.503887, longitude: 4.469936 },
  },
  {
    name: "Belize",
    coordinates: { latitude: 17.189877, longitude: -88.49765 },
  },
  { name: "Benin", coordinates: { latitude: 9.30769, longitude: 2.315834 } },
  {
    name: "Bhutan",
    coordinates: { latitude: 27.514162, longitude: 90.433601 },
  },
  {
    name: "Bolivia",
    coordinates: { latitude: -16.290154, longitude: -63.588653 },
  },
  {
    name: "Bosnia and Herzegovina",
    coordinates: { latitude: 43.915886, longitude: 17.679076 },
  },
  {
    name: "Botswana",
    coordinates: { latitude: -22.328474, longitude: 24.684866 },
  },
  {
    name: "Brazil",
    coordinates: { latitude: -14.235004, longitude: -51.92528 },
  },
  {
    name: "Brunei",
    coordinates: { latitude: 4.535277, longitude: 114.727669 },
  },
  {
    name: "Bulgaria",
    coordinates: { latitude: 42.733883, longitude: 25.48583 },
  },
  {
    name: "Burkina Faso",
    coordinates: { latitude: 12.238333, longitude: -1.561593 },
  },
  {
    name: "Burundi",
    coordinates: { latitude: -3.373056, longitude: 29.918886 },
  },
  {
    name: "Cabo Verde",
    coordinates: { latitude: 16.5388, longitude: -23.0418 },
  },
  {
    name: "Cambodia",
    coordinates: { latitude: 12.565679, longitude: 104.990963 },
  },
  {
    name: "Cameroon",
    coordinates: { latitude: 7.369722, longitude: 12.354722 },
  },
  {
    name: "Canada",
    coordinates: { latitude: 56.130366, longitude: -106.346771 },
  },
  {
    name: "Central African Republic",
    coordinates: { latitude: 6.611111, longitude: 20.939444 },
  },
  { name: "Chad", coordinates: { latitude: 15.454166, longitude: 18.732207 } },
  {
    name: "Chile",
    coordinates: { latitude: -35.675147, longitude: -71.542969 },
  },
  { name: "China", coordinates: { latitude: 35.86166, longitude: 104.195397 } },
  {
    name: "Colombia",
    coordinates: { latitude: 4.570868, longitude: -74.297333 },
  },
  {
    name: "Comoros",
    coordinates: { latitude: -11.875001, longitude: 43.872219 },
  },
  {
    name: "Congo, Democratic Republic of the",
    coordinates: { latitude: -4.038333, longitude: 21.758664 },
  },
  {
    name: "Congo, Republic of the",
    coordinates: { latitude: -0.228021, longitude: 15.827659 },
  },
  {
    name: "Costa Rica",
    coordinates: { latitude: 9.748917, longitude: -83.753428 },
  },
  {
    name: "Cote d'Ivoire",
    coordinates: { latitude: 7.539989, longitude: -5.54708 },
  },
  { name: "Croatia", coordinates: { latitude: 45.1, longitude: 15.2 } },
  { name: "Cuba", coordinates: { latitude: 21.521757, longitude: -77.781167 } },
  {
    name: "Cyprus",
    coordinates: { latitude: 35.126413, longitude: 33.429859 },
  },
  {
    name: "Czech Republic",
    coordinates: { latitude: 49.817492, longitude: 15.472962 },
  },
  { name: "Denmark", coordinates: { latitude: 56.26392, longitude: 9.501785 } },
  {
    name: "Djibouti",
    coordinates: { latitude: 11.825138, longitude: 42.590275 },
  },
  {
    name: "Dominica",
    coordinates: { latitude: 15.414999, longitude: -61.370976 },
  },
  {
    name: "Dominican Republic",
    coordinates: { latitude: 18.735693, longitude: -70.162651 },
  },
  {
    name: "East Timor (Timor-Leste)",
    coordinates: { latitude: -8.874217, longitude: 125.727539 },
  },
  {
    name: "Ecuador",
    coordinates: { latitude: -1.831239, longitude: -78.183406 },
  },
  { name: "Egypt", coordinates: { latitude: 26.820553, longitude: 30.802498 } },
  {
    name: "El Salvador",
    coordinates: { latitude: 13.794185, longitude: -88.89653 },
  },
  {
    name: "Equatorial Guinea",
    coordinates: { latitude: 1.650801, longitude: 10.267895 },
  },
  {
    name: "Eritrea",
    coordinates: { latitude: 15.179384, longitude: 39.782334 },
  },
  {
    name: "Estonia",
    coordinates: { latitude: 58.595272, longitude: 25.013607 },
  },
  {
    name: "Eswatini",
    coordinates: { latitude: -26.522503, longitude: 31.465866 },
  },
  { name: "Ethiopia", coordinates: { latitude: 9.145, longitude: 40.489673 } },
  {
    name: "Fiji",
    coordinates: { latitude: -17.713371, longitude: 178.065032 },
  },
  {
    name: "Finland",
    coordinates: { latitude: 61.92411, longitude: 25.748151 },
  },
  { name: "France", coordinates: { latitude: 46.603354, longitude: 1.888334 } },
  { name: "Gabon", coordinates: { latitude: -0.803689, longitude: 11.609444 } },
  {
    name: "Gambia",
    coordinates: { latitude: 13.443182, longitude: -15.310139 },
  },
  {
    name: "Georgia",
    coordinates: { latitude: 42.315407, longitude: 43.356892 },
  },
  {
    name: "Germany",
    coordinates: { latitude: 51.165691, longitude: 10.451526 },
  },
  { name: "Ghana", coordinates: { latitude: 7.946527, longitude: -1.023194 } },
  {
    name: "Greece",
    coordinates: { latitude: 39.074208, longitude: 21.824312 },
  },
  {
    name: "Grenada",
    coordinates: { latitude: 12.262776, longitude: -61.604171 },
  },
  {
    name: "Guatemala",
    coordinates: { latitude: 15.783471, longitude: -90.230759 },
  },
  { name: "Guinea", coordinates: { latitude: 9.945587, longitude: -9.696645 } },
  {
    name: "Guinea-Bissau",
    coordinates: { latitude: 11.803749, longitude: -15.180413 },
  },
  { name: "Guyana", coordinates: { latitude: 4.860416, longitude: -58.93018 } },
  {
    name: "Haiti",
    coordinates: { latitude: 18.971187, longitude: -72.285215 },
  },
  {
    name: "Honduras",
    coordinates: { latitude: 15.199999, longitude: -86.241905 },
  },
  {
    name: "Hungary",
    coordinates: { latitude: 47.162494, longitude: 19.503304 },
  },
  {
    name: "Iceland",
    coordinates: { latitude: 64.963051, longitude: -19.020835 },
  },
  { name: "India", coordinates: { latitude: 20.593684, longitude: 78.96288 } },
  {
    name: "Indonesia",
    coordinates: { latitude: -0.789275, longitude: 113.921327 },
  },
  { name: "Iran", coordinates: { latitude: 32.427908, longitude: 53.688046 } },
  { name: "Iraq", coordinates: { latitude: 33.223191, longitude: 43.679291 } },
  { name: "Ireland", coordinates: { latitude: 53.41291, longitude: -8.24389 } },
  {
    name: "Israel",
    coordinates: { latitude: 31.046051, longitude: 34.851612 },
  },
  { name: "Italy", coordinates: { latitude: 41.87194, longitude: 12.56738 } },
  {
    name: "Jamaica",
    coordinates: { latitude: 18.109581, longitude: -77.297508 },
  },
  {
    name: "Japan",
    coordinates: { latitude: 36.204824, longitude: 138.252924 },
  },
  {
    name: "Jordan",
    coordinates: { latitude: 30.585164, longitude: 36.238414 },
  },
  {
    name: "Kazakhstan",
    coordinates: { latitude: 48.019573, longitude: 66.923684 },
  },
  { name: "Kenya", coordinates: { latitude: -0.023559, longitude: 37.906193 } },
  {
    name: "Kiribati",
    coordinates: { latitude: -3.370417, longitude: -168.734039 },
  },
  {
    name: "Korea, North",
    coordinates: { latitude: 40.339852, longitude: 127.510093 },
  },
  {
    name: "Korea, South",
    coordinates: { latitude: 35.907757, longitude: 127.766922 },
  },
  {
    name: "Kosovo",
    coordinates: { latitude: 42.602636, longitude: 20.902977 },
  },
  { name: "Kuwait", coordinates: { latitude: 29.31166, longitude: 47.481766 } },
  {
    name: "Kyrgyzstan",
    coordinates: { latitude: 41.20438, longitude: 74.766098 },
  },
  { name: "Laos", coordinates: { latitude: 19.85627, longitude: 102.495496 } },
  {
    name: "Latvia",
    coordinates: { latitude: 56.879635, longitude: 24.603189 },
  },
  {
    name: "Lebanon",
    coordinates: { latitude: 33.854721, longitude: 35.862285 },
  },
  {
    name: "Lesotho",
    coordinates: { latitude: -29.609988, longitude: 28.233608 },
  },
  {
    name: "Liberia",
    coordinates: { latitude: 6.428055, longitude: -9.429499 },
  },
  { name: "Libya", coordinates: { latitude: 26.3351, longitude: 17.228331 } },
  {
    name: "Liechtenstein",
    coordinates: { latitude: 47.166, longitude: 9.555373 },
  },
  {
    name: "Lithuania",
    coordinates: { latitude: 55.169438, longitude: 23.881275 },
  },
  {
    name: "Luxembourg",
    coordinates: { latitude: 49.815273, longitude: 6.129583 },
  },
  {
    name: "Madagascar",
    coordinates: { latitude: -18.766947, longitude: 46.869107 },
  },
  {
    name: "Malawi",
    coordinates: { latitude: -13.254308, longitude: 34.301525 },
  },
  {
    name: "Malaysia",
    coordinates: { latitude: 4.210484, longitude: 101.975766 },
  },
  {
    name: "Maldives",
    coordinates: { latitude: 3.202778, longitude: 73.22068 },
  },
  { name: "Mali", coordinates: { latitude: 17.570692, longitude: -3.996166 } },
  { name: "Malta", coordinates: { latitude: 35.937496, longitude: 14.375416 } },
  {
    name: "Marshall Islands",
    coordinates: { latitude: 7.131474, longitude: 171.184478 },
  },
  {
    name: "Mauritania",
    coordinates: { latitude: 21.00789, longitude: -10.940835 },
  },
  {
    name: "Mauritius",
    coordinates: { latitude: -20.348404, longitude: 57.552152 },
  },
  {
    name: "Mexico",
    coordinates: { latitude: 23.634501, longitude: -102.552784 },
  },
  {
    name: "Micronesia",
    coordinates: { latitude: 7.425554, longitude: 150.550812 },
  },
  {
    name: "Moldova",
    coordinates: { latitude: 47.411631, longitude: 28.369885 },
  },
  { name: "Monaco", coordinates: { latitude: 43.750298, longitude: 7.412841 } },
  {
    name: "Mongolia",
    coordinates: { latitude: 46.862496, longitude: 103.846656 },
  },
  {
    name: "Montenegro",
    coordinates: { latitude: 42.708678, longitude: 19.37439 },
  },
  {
    name: "Morocco",
    coordinates: { latitude: 31.791702, longitude: -7.09262 },
  },
  {
    name: "Mozambique",
    coordinates: { latitude: -18.665695, longitude: 35.529562 },
  },
  {
    name: "Myanmar",
    coordinates: { latitude: 21.913965, longitude: 95.956223 },
  },
  {
    name: "Namibia",
    coordinates: { latitude: -22.95764, longitude: 18.49041 },
  },
  {
    name: "Nauru",
    coordinates: { latitude: -0.522778, longitude: 166.931503 },
  },
  { name: "Nepal", coordinates: { latitude: 28.394857, longitude: 84.124008 } },
  {
    name: "Netherlands",
    coordinates: { latitude: 52.132633, longitude: 5.291266 },
  },
  {
    name: "New Zealand",
    coordinates: { latitude: -40.900557, longitude: 174.885971 },
  },
  {
    name: "Nicaragua",
    coordinates: { latitude: 12.865416, longitude: -85.207229 },
  },
  { name: "Niger", coordinates: { latitude: 17.607789, longitude: 8.081666 } },
  { name: "Nigeria", coordinates: { latitude: 9.081999, longitude: 8.675277 } },
  {
    name: "North Macedonia",
    coordinates: { latitude: 41.608635, longitude: 21.745275 },
  },
  { name: "Norway", coordinates: { latitude: 60.472024, longitude: 8.468946 } },
  { name: "Oman", coordinates: { latitude: 21.512583, longitude: 55.923255 } },
  {
    name: "Pakistan",
    coordinates: { latitude: 30.375321, longitude: 69.345116 },
  },
  { name: "Palau", coordinates: { latitude: 7.51498, longitude: 134.58252 } },
  {
    name: "Panama",
    coordinates: { latitude: 8.537981, longitude: -80.782127 },
  },
  {
    name: "Papua New Guinea",
    coordinates: { latitude: -6.314993, longitude: 143.95555 },
  },
  {
    name: "Paraguay",
    coordinates: { latitude: -23.442503, longitude: -58.443832 },
  },
  { name: "Peru", coordinates: { latitude: -9.189967, longitude: -75.015152 } },
  {
    name: "Philippines",
    coordinates: { latitude: 12.879721, longitude: 121.774017 },
  },
  {
    name: "Poland",
    coordinates: { latitude: 51.919438, longitude: 19.145136 },
  },
  {
    name: "Portugal",
    coordinates: { latitude: 39.399872, longitude: -8.224454 },
  },
  { name: "Qatar", coordinates: { latitude: 25.354826, longitude: 51.183884 } },
  {
    name: "Romania",
    coordinates: { latitude: 45.943161, longitude: 24.96676 },
  },
  {
    name: "Russia",
    coordinates: { latitude: 61.52401, longitude: 105.318756 },
  },
  {
    name: "Rwanda",
    coordinates: { latitude: -1.940278, longitude: 29.873888 },
  },
  {
    name: "Saint Kitts and Nevis",
    coordinates: { latitude: 17.357822, longitude: -62.782998 },
  },
  {
    name: "Saint Lucia",
    coordinates: { latitude: 13.909444, longitude: -60.978893 },
  },
  {
    name: "Saint Vincent and the Grenadines",
    coordinates: { latitude: 12.984305, longitude: -61.287228 },
  },
  {
    name: "Samoa",
    coordinates: { latitude: -13.759029, longitude: -172.104629 },
  },
  {
    name: "San Marino",
    coordinates: { latitude: 43.94236, longitude: 12.457777 },
  },
  {
    name: "Sao Tome and Principe",
    coordinates: { latitude: 0.18636, longitude: 6.613081 },
  },
  {
    name: "Saudi Arabia",
    coordinates: { latitude: 23.885942, longitude: 45.079162 },
  },
  {
    name: "Senegal",
    coordinates: { latitude: 14.497401, longitude: -14.452362 },
  },
  {
    name: "Serbia",
    coordinates: { latitude: 44.016521, longitude: 21.005859 },
  },
  {
    name: "Seychelles",
    coordinates: { latitude: -4.679574, longitude: 55.491977 },
  },
  {
    name: "Sierra Leone",
    coordinates: { latitude: 8.460555, longitude: -11.779889 },
  },
  {
    name: "Singapore",
    coordinates: { latitude: 1.352083, longitude: 103.819836 },
  },
  {
    name: "Slovakia",
    coordinates: { latitude: 48.669026, longitude: 19.699024 },
  },
  {
    name: "Slovenia",
    coordinates: { latitude: 46.151241, longitude: 14.995463 },
  },
  {
    name: "Solomon Islands",
    coordinates: { latitude: -9.64571, longitude: 160.156194 },
  },
  {
    name: "Somalia",
    coordinates: { latitude: 5.152149, longitude: 46.199616 },
  },
  {
    name: "South Africa",
    coordinates: { latitude: -30.559482, longitude: 22.937506 },
  },
  {
    name: "South Sudan",
    coordinates: { latitude: 6.876991, longitude: 31.306978 },
  },
  { name: "Spain", coordinates: { latitude: 40.463667, longitude: -3.74922 } },
  {
    name: "Sri Lanka",
    coordinates: { latitude: 7.873054, longitude: 80.771797 },
  },
  { name: "Sudan", coordinates: { latitude: 12.862807, longitude: 30.217636 } },
  {
    name: "Suriname",
    coordinates: { latitude: 3.919305, longitude: -56.027783 },
  },
  {
    name: "Sweden",
    coordinates: { latitude: 60.128161, longitude: 18.643501 },
  },
  {
    name: "Switzerland",
    coordinates: { latitude: 46.818188, longitude: 8.227512 },
  },
  { name: "Syria", coordinates: { latitude: 34.802075, longitude: 38.996815 } },
  {
    name: "Taiwan",
    coordinates: { latitude: 23.69781, longitude: 120.960515 },
  },
  {
    name: "Tajikistan",
    coordinates: { latitude: 38.861034, longitude: 71.276093 },
  },
  {
    name: "Tanzania",
    coordinates: { latitude: -6.369028, longitude: 34.888822 },
  },
  {
    name: "Thailand",
    coordinates: { latitude: 15.870032, longitude: 100.992541 },
  },
  {
    name: "Timor-Leste",
    coordinates: { latitude: -8.874217, longitude: 125.727539 },
  },
  { name: "Togo", coordinates: { latitude: 8.619543, longitude: 0.824782 } },
  {
    name: "Tonga",
    coordinates: { latitude: -21.178986, longitude: -175.198242 },
  },
  {
    name: "Trinidad and Tobago",
    coordinates: { latitude: 10.691803, longitude: -61.222503 },
  },
  {
    name: "Tunisia",
    coordinates: { latitude: 33.886917, longitude: 9.537499 },
  },
  {
    name: "Turkey",
    coordinates: { latitude: 38.963745, longitude: 35.243322 },
  },
  {
    name: "Turkmenistan",
    coordinates: { latitude: 38.969719, longitude: 59.556278 },
  },
  {
    name: "Tuvalu",
    coordinates: { latitude: -7.109535, longitude: 177.64933 },
  },
  { name: "Uganda", coordinates: { latitude: 1.373333, longitude: 32.290275 } },
  {
    name: "Ukraine",
    coordinates: { latitude: 48.379433, longitude: 31.16558 },
  },
  {
    name: "United Arab Emirates",
    coordinates: { latitude: 23.424076, longitude: 53.847818 },
  },
  {
    name: "United Kingdom",
    coordinates: { latitude: 55.378051, longitude: -3.435973 },
  },
  {
    name: "United States",
    coordinates: { latitude: 37.09024, longitude: -95.712891 },
  },
  {
    name: "Uruguay",
    coordinates: { latitude: -32.522779, longitude: -55.765835 },
  },
  {
    name: "Uzbekistan",
    coordinates: { latitude: 41.377491, longitude: 64.585262 },
  },
  {
    name: "Vanuatu",
    coordinates: { latitude: -15.376706, longitude: 166.959158 },
  },
  {
    name: "Vatican City",
    coordinates: { latitude: 41.902916, longitude: 12.453389 },
  },
  {
    name: "Venezuela",
    coordinates: { latitude: 6.42375, longitude: -66.58973 },
  },
  {
    name: "Vietnam",
    coordinates: { latitude: 14.058324, longitude: 108.277199 },
  },
  { name: "Yemen", coordinates: { latitude: 15.552727, longitude: 48.516388 } },
  {
    name: "Zambia",
    coordinates: { latitude: -13.133897, longitude: 27.849332 },
  },
  {
    name: "Zimbabwe",
    coordinates: { latitude: -19.015438, longitude: 29.154857 },
  },
];

export const statesUSA = [
  { name: 'Alabama', abbreviation: 'AL' },
  { name: 'Alaska', abbreviation: 'AK' },
  { name: 'Arizona', abbreviation: 'AZ' },
  { name: 'Arkansas', abbreviation: 'AR' },
  { name: 'California', abbreviation: 'CA' },
  { name: 'Colorado', abbreviation: 'CO' },
  { name: 'Connecticut', abbreviation: 'CT' },
  { name: 'Delaware', abbreviation: 'DE' },
  { name: 'Florida', abbreviation: 'FL' },
  { name: 'Georgia', abbreviation: 'GA' },
  { name: 'Hawaii', abbreviation: 'HI' },
  { name: 'Idaho', abbreviation: 'ID' },
  { name: 'Illinois', abbreviation: 'IL' },
  { name: 'Indiana', abbreviation: 'IN' },
  { name: 'Iowa', abbreviation: 'IA' },
  { name: 'Kansas', abbreviation: 'KS' },
  { name: 'Kentucky', abbreviation: 'KY' },
  { name: 'Louisiana', abbreviation: 'LA' },
  { name: 'Maine', abbreviation: 'ME' },
  { name: 'Maryland', abbreviation: 'MD' },
  { name: 'Massachusetts', abbreviation: 'MA' },
  { name: 'Michigan', abbreviation: 'MI' },
  { name: 'Minnesota', abbreviation: 'MN' },
  { name: 'Mississippi', abbreviation: 'MS' },
  { name: 'Missouri', abbreviation: 'MO' },
  { name: 'Montana', abbreviation: 'MT' },
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Nevada', abbreviation: 'NV' },
  { name: 'New Hampshire', abbreviation: 'NH' },
  { name: 'New Jersey', abbreviation: 'NJ' },
  { name: 'New Mexico', abbreviation: 'NM' },
  { name: 'New York', abbreviation: 'NY' },
  { name: 'North Carolina', abbreviation: 'NC' },
  { name: 'North Dakota', abbreviation: 'ND' },
  { name: 'Ohio', abbreviation: 'OH' },
  { name: 'Oklahoma', abbreviation: 'OK' },
  { name: 'Oregon', abbreviation: 'OR' },
  { name: 'Pennsylvania', abbreviation: 'PA' },
  { name: 'Rhode Island', abbreviation: 'RI' },
  { name: 'South Carolina', abbreviation: 'SC' },
  { name: 'South Dakota', abbreviation: 'SD' },
  { name: 'Tennessee', abbreviation: 'TN' },
  { name: 'Texas', abbreviation: 'TX' },
  { name: 'Utah', abbreviation: 'UT' },
  { name: 'Vermont', abbreviation: 'VT' },
  { name: 'Virginia', abbreviation: 'VA' },
  { name: 'Washington', abbreviation: 'WA' },
  { name: 'West Virginia', abbreviation: 'WV' },
  { name: 'Wisconsin', abbreviation: 'WI' },
  { name: 'Wyoming', abbreviation: 'WY' }
];