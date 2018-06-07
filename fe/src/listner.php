<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Content-Type:application/json");


$body = file_get_contents("php://input");

if($body) {
    $body_params = json_decode($body);

    foreach ($body_params->options as $key => $value) {
        $options[$key] = $value;
    }
    
    makeRequest($body_params->endpoint, $options);
}

function makeRequest($uri, $bodyParams) {

	$curl = curl_init();

	$postFields = handlePostFields($bodyParams);
	
	curl_setopt_array($curl, array(
		CURLOPT_URL =>  getEnvironment()."/challenge/api/{$uri}",
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => $postFields,
		CURLOPT_HTTPHEADER => array(
			'accept: */*',
			'Content-type: application/json',
			"cache-control: no-cache",
		),
	));
	
	$response = curl_exec($curl);
	$err = curl_error($curl);
	
	curl_close($curl);
	
	if ($err) {
	  echo "cURL Error #:" . $err;
	} else {
	  echo $response;
	}
}

/**
 * Handle the PostField Options
 * @param array $bodyParams
 * @return json $postFields
 */
function handlePostFields($bodyParams)
{
	$postFields = [
		"Header" => [
			"Application" => "CHALLENGE",
			"TransactionId" => null
		],
		"Body" => [
			"Target" => "SRV",
		]
	];

	if (count($bodyParams) > 0) {
		
		foreach ($bodyParams as $key => $value) {
			$postFields["Body"][$key] = $value; 
		}

	}

	return json_encode($postFields, true);  
}

function getEnvironment()
{
	if ($_SERVER['SERVER_NAME'] === 'localhost') {
		return "http://localhost:8010";
	} else {
		return "https://srv.challenge.ricardolapa.com";
	}
	//return "https://srv.challenge.ricardolapa.com";
}

