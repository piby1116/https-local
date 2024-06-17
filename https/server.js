const https = require('https');
const fs = require('fs');
const path = require('path');

// 인증서 파일 경로 설정
const keyPath = path.resolve(__dirname, 'givernance.com+3-key.pem');
const certPath = path.resolve(__dirname, 'givernance.com+3.pem');

// 인증서 파일 읽기
let key, cert;
try {
    key = fs.readFileSync(keyPath);
    cert = fs.readFileSync(certPath);
    console.log('SSL 인증서 파일을 성공적으로 읽었습니다.');
} catch (error) {
    console.error('SSL 인증서 파일을 읽는 중 오류가 발생했습니다:', error);
    process.exit(1); // 오류 발생 시 프로세스를 종료합니다.
}

// HTTPS 서버 설정
const options = {
    key: key,
    cert: cert,
};

// 서버 생성 및 요청 처리
https.createServer(options, (req, res) => {
    console.log(`요청 처리: ${req.method} ${req.url}`);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, HTTPS!\n');
}).listen(8443, () => {
    console.log('Server running at https://localhost:8443/');
    console.log('Server also accessible at https://givernance.com:8443/');
});
