import React, { useState, useEffect } from 'react';
import NavigationAdminComponent from '../../Navigation/NavigationAdmin/NavigationAdmin.component';
import axios from 'axios';
import { MultiSelect } from "react-multi-select-component";

const Edition = () => {
    const [posts, setPosts] = useState([]);
    const [selected, setSelected] = useState([]);
    let date = new Date()
    let today = date.toISOString().split('T')[0];

    let url = window.location.href;
    const id = url.substring(34, url.length);
    const options = [
        { label: "Dex", value: "Dex" },
        { label: "Gaming", value: "Gaming" },
        { label: "Nft", value: "Nft" },
        { label: "Lending", value: "Lending" },
        { label: "Algo-Stables", value: "Algo-Stables" },
        { label: "Derivatives", value: "Derivatives" },
        { label: "Yield Aggregatort", value: "Yield Aggregatort" },
        { label: "Reflect token", value: "Reflect token" },
        { label: "Yield", value: "Yield" },


    ];

    console.log('ooooooo')

    const [inputs, setInputs] = useState({});

    const upload = () => {

        const inputImg = document.querySelector("input[type=file]");
        let fileCount = inputImg.files.length;
        if (fileCount > 0) {

            console.log(" inputImg.files.item(0)", inputImg.files.item(0))
            let formData = new FormData();
            formData.append('image', inputImg.files.item(0))
            console.log('formData', formData)
            axios({
                method: "post",
                url: "http://localhost:3000/images",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: inputs.name, symbol: inputs.symbol, launchDate: inputs.launchDate, contractAddress: inputs.contractAddress, description: inputs.description, type: selected,
                websiteLink: inputs.websiteLink, customChartLink: inputs.customChartLink, customSwapLink: inputs.customSwapLink,
                telegram: inputs.telegram, twitter: inputs.twitter, discord: inputs.discord, image: inputs.image
            })
        };
        fetch(`http://localhost:3000/adminEdit/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
    }





    useEffect(() => {
        fetch('http://localhost:3000/launchDateAdmin/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
                let listType = JSON.parse(JSON.stringify(res));
                for (let i = 0; i < listType.length; i++) {
                    if (listType[i]._id === id) {
                        console.log(listType[i].type)
                        console.log('selected',selected)
                        setSelected([listType[i].type][0]);
                    }


                }

            });
    }, []);


    let postsArray = JSON.parse(JSON.stringify(posts));
    let coin = []

    for (let i = 0; i < postsArray.length; i++) {
        if (postsArray[i]._id === id) {
            coin = postsArray[i];
        }


    }

    return (

        <div>
            <NavigationAdminComponent />

            <br /><br /><br />
            <form className="formulaireSubmit" onSubmit={handleSubmit}>
                <label className="FormLabel">Name*:

                    <input className="FormInput"
                        type="text"
                        name="name"
                        value={inputs.name || coin.name}
                        onChange={handleChange}
                    />
                </label>
                <label className="FormLabel">Symbol*:
                    <input className="FormInput"
                        type="text"
                        name="symbol"
                        value={inputs.symbol || coin.symbol}
                        onChange={handleChange}
                    ></input>
                </label>

                <label className="FormLabel">LaunchDate*:
                    <input className="FormInput"
                        type="date"
                        name="launchDate"
                        min={today}
                        value={inputs.launchDate || coin.launchDate}
                        onChange={handleChange}
                    />
                </label>
                <label className="FormLabel">Contract Address*:
                    <input className="FormInput"
                        type="text"
                        name="contractAddress"
                        value={inputs.contractAddress || coin.contractAddress}
                        onChange={handleChange}
                    />

                </label>

                <label className="FormLabel">Description*:

                    <input className="FormInput"
                        type="text"
                        name="description"
                        value={inputs.description || coin.description}
                        onChange={handleChange}
                    />
                </label>

                <label className="FormLabel">Type*:
                    <MultiSelect
                        options={options}
                        value={selected}
                        hasSelectAll={false}
                        onChange={setSelected}
                        labelledBy="Select Type"
                    />

                </label>

                <label className="FormLabel">Website link*:
                    <input className="FormInput"
                        type="text"
                        name="websiteLink"
                        value={inputs.websiteLink || coin.websiteLink}
                        onChange={handleChange}>
                    </input>
                </label>

                <label className="FormLabel">Custom chart link:
                    <input className="FormInput"
                        type="text"
                        name="customChartLink"
                        value={inputs.customChartLink || coin.customChartLink}
                        onChange={handleChange}>
                    </input>
                </label>


                <label className="FormLabel">Custom swap link:
                    <input className="FormInput"
                        type="text"
                        name="customSwapLink"
                        value={inputs.customSwapLink || coin.customSwapLink}
                        onChange={handleChange}>
                    </input>
                </label>

                <label className="FormLabel">Telegram link:
                    <input className="FormInput"
                        type="text"
                        name="telegram"
                        value={inputs.telegram || coin.telegram}
                        onChange={handleChange}>
                    </input>
                </label>


                <label className="FormLabel">Twitter link:
                    <input className="FormInput"
                        type="text"
                        name="twitter"
                        value={inputs.twitter || coin.twitter}
                        onChange={handleChange}>
                    </input>
                </label>


                <label className="FormLabel">Discord link:
                    <input className="FormInput"
                        type="text"
                        name="discord"
                        value={inputs.discord || coin.discord}
                        onChange={handleChange}>
                    </input>
                </label>

                <label className="FormLabel">Logo:
                    <input className="FormInput"
                        type="file"
                        name="image"
                        value={inputs.image}
                        onChange={handleChange}
                        accept="image/png, image/jpeg">
                    </input>
                </label>
                <button type="button" className="btn btn-secondary" onClick={upload}>Upload</button>


                <input className="btn btn-primary btn-block" id="submitInput" type="submit" />
            </form >
        </div>
    )
}

export default Edition;