export interface LocationData {
  states: {
    [key: string]: {
      name: string
      districts: string[]
    }
  }
}

export const INDIAN_LOCATIONS: LocationData = {
  states: {
    "andhra-pradesh": {
      name: "Andhra Pradesh",
      districts: [
        "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool",
        "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram",
        "West Godavari", "YSR Kadapa"
      ]
    },
    "arunachal-pradesh": {
      name: "Arunachal Pradesh",
      districts: [
        "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang",
        "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit",
        "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri",
        "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang",
        "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"
      ]
    },
    "assam": {
      name: "Assam",
      districts: [
        "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo",
        "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara",
        "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan",
        "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli",
        "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur",
        "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"
      ]
    },
    "bihar": {
      name: "Bihar",
      districts: [
        "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur",
        "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj",
        "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj",
        "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur",
        "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa",
        "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi",
        "Siwan", "Supaul", "Vaishali", "West Champaran"
      ]
    },
    "chhattisgarh": {
      name: "Chhattisgarh",
      districts: [
        "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur",
        "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela Pendra Marwahi",
        "Janjgir Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba",
        "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur",
        "Rajnandgaon", "Sukma", "Surajpur", "Surguja"
      ]
    },
    "goa": {
      name: "Goa",
      districts: ["North Goa", "South Goa"]
    },
    "gujarat": {
      name: "Gujarat",
      districts: [
        "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch",
        "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka",
        "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch",
        "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal",
        "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar",
        "Tapi", "Vadodara", "Valsad"
      ]
    },
    "haryana": {
      name: "Haryana",
      districts: [
        "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad",
        "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal",
        "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula",
        "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
      ]
    },
    "himachal-pradesh": {
      name: "Himachal Pradesh",
      districts: [
        "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu",
        "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
      ]
    },
    "jharkhand": {
      name: "Jharkhand",
      districts: [
        "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum",
        "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara",
        "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu",
        "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega",
        "West Singhbhum"
      ]
    },
    "karnataka": {
      name: "Karnataka",
      districts: [
        "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban",
        "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga",
        "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan",
        "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya",
        "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru",
        "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
      ]
    },
    "kerala": {
      name: "Kerala",
      districts: [
        "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam",
        "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta",
        "Thiruvananthapuram", "Thrissur", "Wayanad"
      ]
    },
    "madhya-pradesh": {
      name: "Madhya Pradesh",
      districts: [
        "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat",
        "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chachaura",
        "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar",
        "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore",
        "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla",
        "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Niwari", "Panna",
        "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna",
        "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri",
        "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
      ]
    },
    "maharashtra": {
      name: "Maharashtra",
      districts: [
        "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara",
        "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli",
        "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban",
        "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar",
        "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara",
        "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
      ]
    },
    "manipur": {
      name: "Manipur",
      districts: [
        "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West",
        "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl",
        "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
      ]
    },
    "meghalaya": {
      name: "Meghalaya",
      districts: [
        "East Garo Hills", "East Jaintia Hills", "East Khasi Hills",
        "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills",
        "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills",
        "West Khasi Hills"
      ]
    },
    "mizoram": {
      name: "Mizoram",
      districts: [
        "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai",
        "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"
      ]
    },
    "nagaland": {
      name: "Nagaland",
      districts: [
        "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon",
        "Noklak", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"
      ]
    },
    "odisha": {
      name: "Odisha",
      districts: [
        "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh",
        "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur",
        "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara",
        "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj",
        "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur",
        "Subarnapur", "Sundargarh"
      ]
    },
    "punjab": {
      name: "Punjab",
      districts: [
        "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib",
        "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar",
        "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawanshahr",
        "Pathankot", "Patiala", "Rupnagar", "Sangrur", "Tarn Taran"
      ]
    },
    "rajasthan": {
      name: "Rajasthan",
      districts: [
        "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur",
        "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa",
        "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer",
        "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota",
        "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur",
        "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
      ]
    },
    "sikkim": {
      name: "Sikkim",
      districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"]
    },
    "tamil-nadu": {
      name: "Tamil Nadu",
      districts: [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
        "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram",
        "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
        "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
        "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
        "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
        "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
        "Vellore", "Viluppuram", "Virudhunagar"
      ]
    },
    "telangana": {
      name: "Telangana",
      districts: [
        "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon",
        "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar",
        "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", "Mahabubnagar",
        "Mancherial", "Medak", "Medchal Malkajgiri", "Mulugu", "Nagarkurnool",
        "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli",
        "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet",
        "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"
      ]
    },
    "tripura": {
      name: "Tripura",
      districts: [
        "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala",
        "South Tripura", "Unakoti", "West Tripura"
      ]
    },
    "uttar-pradesh": {
      name: "Uttar Pradesh",
      districts: [
        "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya",
        "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur",
        "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor",
        "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria",
        "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad",
        "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur",
        "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur",
        "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj",
        "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow",
        "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut",
        "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh",
        "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal",
        "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar",
        "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
      ]
    },
    "uttarakhand": {
      name: "Uttarakhand",
      districts: [
        "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun",
        "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag",
        "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
      ]
    },
    "west-bengal": {
      name: "West Bengal",
      districts: [
        "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur",
        "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram",
        "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia",
        "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur",
        "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas",
        "Uttar Dinajpur"
      ]
    },
    "delhi": {
      name: "Delhi",
      districts: [
        "Central Delhi", "East Delhi", "New Delhi", "North Delhi",
        "North East Delhi", "North West Delhi", "Shahdara", "South Delhi",
        "South East Delhi", "South West Delhi", "West Delhi"
      ]
    },
    "jammu-kashmir": {
      name: "Jammu and Kashmir",
      districts: [
        "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal",
        "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch",
        "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian",
        "Srinagar", "Udhampur"
      ]
    },
    "ladakh": {
      name: "Ladakh",
      districts: ["Kargil", "Leh"]
    },
    "puducherry": {
      name: "Puducherry",
      districts: ["Karaikal", "Mahe", "Puducherry", "Yanam"]
    }
  }
}

export function getStates(): Array<{value: string, label: string}> {
  return Object.entries(INDIAN_LOCATIONS.states).map(([key, state]) => ({
    value: key,
    label: state.name
  }))
}

export function getDistricts(stateKey: string): Array<{value: string, label: string}> {
  const state = INDIAN_LOCATIONS.states[stateKey]
  if (!state) return []
  
  return state.districts.map(district => ({
    value: district.toLowerCase().replace(/\s+/g, '-'),
    label: district
  }))
}