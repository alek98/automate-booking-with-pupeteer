const puppeteer = require('puppeteer')
const html = `
<div class="table-responsive">
  <div class="card wb-card-info">
    <div class="card-body wb-center">
      <div class="wb-card-info-title">Skanör</div>
      <div>tisdagen den 27:e juli</div>
    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">07:00 - 08:00</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9MjM3JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Virtuell
            BODYBALANCE® </a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE2JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Aerobicsalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0yODAmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">LES
            MILLS Virtuell Tränare</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMjI2MyZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">08:15 - 08:45</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9MjM2JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Virtuell
            LES MILLS CORE® </a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE2JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Aerobicsalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0yODAmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">LES
            MILLS Virtuell Tränare</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMjI2NCZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">09:00 - 10:00</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9MyZ1c2VyaWQ9QXJyYXl7J3VzZXJpZCd9JnBhc3M9QXJyYXl7J3Bhc3MnfQ%3D%3D">BODYPUMP®</a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE2JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Aerobicsalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0xNDcmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Angelica
            C</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMDM2NCZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">09:15 - 10:00</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9MTE2JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Virtuell
            IDW45</a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE3JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">IndoorWalkingsalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0yNzcmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Virtuell
            tränare</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMjk1MiZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">10:10 - 11:00</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9MTM5JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Yoga
            Ute</a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTIwJnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Ute</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0yNzImdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Malinda</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMDY5NSZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">10:15 - 10:45</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9NjkmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Virtuell
            IDW30</a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE3JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">IndoorWalkingsalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0yODYmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Nora</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMjk1MyZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">12:00 - 12:30</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9MjM1JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Virtuell
            BODYPUMP® 30</a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE2JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Aerobicsalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0yODAmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">LES
            MILLS Virtuell Tränare</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMzE0MyZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">12:45 - 13:15</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9NjkmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Virtuell
            IDW30</a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE3JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">IndoorWalkingsalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0xNTQmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Caroline</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMzE1NSZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">16:00 - 17:00</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9OTYmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Ungdomsstyrketräning</a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE1JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Styrkesalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0yMDImdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Clara</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMzMzNiZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">17:00 - 17:45</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9MTE2JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Virtuell
            IDW45</a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE3JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">IndoorWalkingsalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0xMjUmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Petra
            L</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMjk1NCZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">17:15 - 17:45</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9NzMmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">LES
            MILLS CORE®</a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE2JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Aerobicsalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0yNDYmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Jessica</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMDM2NSZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">18:00 - 19:00</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9MjgmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">BODYBALANCE®</a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE2JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Aerobicsalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0xMTcmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Amanda
          </a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMDM2NiZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">18:00 - 18:30</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9MTA1JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">IndoorWalking
            30</a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE3JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">IndoorWalkingsalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD02MyZ1c2VyaWQ9QXJyYXl7J3VzZXJpZCd9JnBhc3M9QXJyYXl7J3Bhc3MnfQ%3D%3D">Jörgen</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMDM2OCZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">19:20 - 20:05</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9MTY2JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Containerträning
          </a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTIwJnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Ute</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0yNzYmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Lars
            S</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMDM2NyZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>
  <div class="card wb-card wb-card-status-none">
    <div class="card-body ">
      <div class="row">
        <div class="col-8">
          <p class="nobr">19:30 - 20:15</p>
          <a class="booking-info-link bold"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld190eXAmdHlwaWQ9MTE2JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">Virtuell
            IDW45</a>
          <br>
          <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19sb2thbCZsb2thbGlkPTE3JnVzZXJpZD1BcnJheXsndXNlcmlkJ30mcGFzcz1BcnJheXsncGFzcyd9">IndoorWalkingsalen</a>
          - <a class="booking-info-link"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249dmlld19pbnN0cnVrdG9yJmluc3RydWt0b3JpZD0xNTQmdXNlcmlkPUFycmF5eyd1c2VyaWQnfSZwYXNzPUFycmF5eydwYXNzJ30%3D">Caroline</a>
        </div>
        <div class="col-4" valign="top">
          <a class="btn btn-success float-right"
            href="bok.php?ncdata=Y2ZnPUFycmF5eydjZmcnfSZhY3Rpb249cGFzc19ib2tuaW5nJnBhc3NpZD0xMzEzMiZkYXR1bT0yMDIxMDcyNyZ1c2VyaWQ9JnN0YXR1cz0w">boka</a>
        </div>
      </div>


    </div>
  </div>


  &nbsp;


</div>
`

let browser, page, navigationPromise;
main();

async function main() {
  browser = await puppeteer.launch({ headless: false, slowMo: 50 })
  browser = await puppeteer.launch({ headless: true })
  page = await browser.newPage()
  navigationPromise = page.waitForNavigation()
  await init()

  const programName = 'bodypump'
  await chooseProgram(programName)

  await browser.close()
}

async function init() {
  await page.goto(`data:text/html,${html}`)
  await page.setViewport({ width: 1280, height: 1276 })
  await navigationPromise
}

async function chooseProgram(programName) {
  await page.waitForSelector('.table-responsive .card-body .row')
  let programs = await page.$$('.table-responsive .card-body .row')
  console.log(programs.length)

  for(let i = 0; i < programs.length; i++ ) {

    let time = await programs[i].$('.nobr')
    time = await time.getProperty('innerHTML')
    time = await time.jsonValue()

    // shorthand zapis
    let name = await (await (await programs[i].$('.booking-info-link.bold')).getProperty('innerText')).jsonValue();

    let description1 = await (await (await programs[i].$$('.booking-info-link'))[1].getProperty('innerText')).jsonValue();
    let description2 = await (await (await programs[i].$$('.booking-info-link'))[2].getProperty('innerText')).jsonValue();
    let description = `${description1} - ${description2}`

    let data = { time, name, description}

    if (data.name.toLowerCase().includes(programName)) {
      const button = await programs[i].$('.col-4 .btn')
      await button.click()
      break
    }
  }
  await navigationPromise
  
  /*
  // create data
  const infoData = await Promise.all(programs.map(async program => {

    let time = await program.$('.nobr')
    time = await time.getProperty('innerHTML')
    time = await time.jsonValue()

    // shorthand zapis
    let name = await (await (await program.$('.booking-info-link.bold')).getProperty('innerText')).jsonValue();

    let description1 = await (await (await program.$$('.booking-info-link'))[1].getProperty('innerText')).jsonValue();
    let description2 = await (await (await program.$$('.booking-info-link'))[2].getProperty('innerText')).jsonValue();
    let description = `${description1} - ${description2}`

    let data = { time, name, description }
    return data;
  }))
  */
}