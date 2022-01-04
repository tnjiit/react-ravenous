const apiKey = process.env.API_KEY;
console.log(process.env);

const Yelp = {
    search(term, location, sortBy){
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(
            response => {
                return response.json();
            }
        ).then(
            jsonResponse => {
                if(jsonResponse.businesses){
                    return jsonResponse.businesses.map(
                        business => {
                            return {
                                id: business.id,
                                imageSrc: business.image_url,
                                name: business.name,
                                address: business.location.address1,
                                city: business.location.city,
                                state: business.location.state,
                                zipCode: business.location.zip_code,
                                category: business.categories.map(
                                    category => {
                                        return category.title;
                                    }
                                ),
                                rating: business.rating,
                                reviewCount: business.review_count
                            };
                        }
                    );
                }
            }
        );
    },
};


export default Yelp;
