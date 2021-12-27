import {config} from './mail-template-config';

function getSocials(): string {
  let socials = '';
  config.project.socials.forEach(({name, url}) => {
    socials += `<a href="${url}" style="box-sizing:border-box;color:${config.project.color};font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">${name}</a>`;
  });
  return socials;
}

export function getTemplateLayout(content: string) {
  return `<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width" />
</head>
<body
  style="
    -moz-box-sizing: border-box;
    -ms-text-size-adjust: 100%;
    -webkit-box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
    box-sizing: border-box;
    color: #1c232b;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: normal;
    line-height: 22px;
    margin: 0;
    min-width: 100%;
    padding: 0;
    text-align: left;
    width: 100% !important;
  "
>
  <table
    bgcolor="#fdfdfd"
    style="
      box-sizing: border-box;
      border-spacing: 0;
      width: 100%;
      background-color: #fdfdfd;
      border-collapse: separate !important;
    "
    width="100%"
  >
    <tbody>
      <tr>
        <td
          style="
            box-sizing: border-box;
            padding: 0;
            font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
            font-size: 16px;
            vertical-align: top;
          "
          valign="top"
        >
          &nbsp;
        </td>
        <td
          style="
            box-sizing: border-box;
            padding: 0;
            font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
            font-size: 16px;
            vertical-align: top;
            display: block;
            width: 600px;
            max-width: 600px;
            margin: 0 auto !important;
          "
          valign="top"
          width="600"
        >
          <div
            style="
              box-sizing: border-box;
              display: block;
              max-width: 600px;
              margin: 0 auto;
              padding: 10px;
            "
          >
            <div
              style="
                box-sizing: border-box;
                width: 100%;
                margin-bottom: 30px;
                margin-top: 15px;
              "
            >
              <table
                style="
                  box-sizing: border-box;
                  width: 100%;
                  border-spacing: 0;
                  border-collapse: separate !important;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td
                      align="left"
                      style="
                        box-sizing: border-box;
                        padding: 0;
                        font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
                        font-size: 16px;
                        vertical-align: top;
                        text-align: left;
                      "
                      valign="top"
                    >
                      <span
                        ><a
                          href="${config.project.url}"
                          style="
                            box-sizing: border-box;
                            color: ${config.project.color};
                            font-weight: 400;
                            text-decoration: none;
                          "
                          target="_blank"
                          ><img
                            alt="${config.project.name}"
                            height="30"
                            src="${config.project.logoUrl}"
                            style="
                              max-width: 100%;
                              border-style: none;
                              height: 30px;
                              width: 137px;
                            "
                            width="137" /></a
                      ></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              style="
                box-sizing: border-box;
                width: 100%;
                background: #ffffff;
                border: 1px solid #f0f0f0;
              "
            >
              <table
                style="
                  box-sizing: border-box;
                  width: 100%;
                  border-spacing: 0;
                  border-collapse: separate !important;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        box-sizing: border-box;
                        font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
                        font-size: 16px;
                        vertical-align: top;
                        padding: 30px;
                      "
                      valign="top"
                    >
                    ${content}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="box-sizing: border-box; clear: both; width: 100%">
              <table
                style="
                  box-sizing: border-box;
                  width: 100%;
                  border-spacing: 0;
                  font-size: 12px;
                  border-collapse: separate !important;
                "
                width="100%"
              >
                <tbody>
                  <tr style="font-size: 12px">
                    <td
                      align="center"
                      style="
                        box-sizing: border-box;
                        font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
                        vertical-align: top;
                        font-size: 12px;
                        text-align: center;
                        padding: 20px 0;
                      "
                      valign="top"
                    >
                      <p
                        style="
                          margin: 0;
                          color: #294661;
                          font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
                          font-weight: 300;
                          font-size: 12px;
                          margin-bottom: 5px;
                        "
                      >
                        ${config.project.name}
                      </p>
                      <p
                        style="
                          margin: 0;
                          color: #294661;
                          font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
                          font-weight: 300;
                          font-size: 12px;
                          margin-bottom: 5px;
                        "
                      >
                        ${getSocials()}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </td>
        <td
          style="
            box-sizing: border-box;
            padding: 0;
            font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
            font-size: 16px;
            vertical-align: top;
          "
          valign="top"
        >
          &nbsp;
        </td>
      </tr>
    </tbody>
  </table>
</body>
`;
}
